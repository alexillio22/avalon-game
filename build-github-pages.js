#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando build para GitHub Pages...');

// 1. Ejecutar el build normal de Expo
const { execSync } = require('child_process');

try {
  console.log('📦 Ejecutando expo export...');
  execSync('npx expo export -p web --output-dir dist --clear --no-minify', { stdio: 'inherit' });
  
  // Mover archivos de _expo/ a static/ para evitar bloqueo de GitHub Pages
  console.log('📦 Copiando archivos de _expo/static/ a static/...');
  const expoStaticPath = path.join(__dirname, 'dist', '_expo', 'static');
  const distStaticPath = path.join(__dirname, 'dist', 'static');
  
  if (fs.existsSync(expoStaticPath)) {
    // Copiar recursivamente usando función nativa de Node
    function copyRecursive(src, dest) {
      if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(file => {
          copyRecursive(path.join(src, file), path.join(dest, file));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    }
    copyRecursive(expoStaticPath, distStaticPath);
    console.log('✅ Archivos copiados de _expo/static/ a static/');
  } else {
    console.log('⚠️ No se encontró _expo/static/, omitiendo copia');
  }
  
  // 2. Añadir query string al JS para forzar recarga
  console.log('🔄 Modificando rutas y añadiendo cache buster...');
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  let indexContent = fs.readFileSync(distIndexPath, 'utf8');
  console.log('📄 HTML original (primeros 500 chars):', indexContent.substring(0, 500));
  
  const timestamp = Date.now();
  const originalLength = indexContent.length;
  
  // Cambiar rutas de _expo/static/ a static/
  indexContent = indexContent.replace(
    /_expo\/static\//g,
    'static/'
  );
  
  // Cambiar rutas absolutas a relativas (agregar ./ al inicio)
  indexContent = indexContent.replace(
    /src="\/static\//g,
    'src="./static/'
  );
  indexContent = indexContent.replace(
    /href="\/manifest\.json"/g,
    'href="./manifest.json"'
  );
  indexContent = indexContent.replace(
    /href="\/favicon\.ico"/g,
    'href="./favicon.ico"'
  );
  indexContent = indexContent.replace(
    /href="\/icon-192\.png"/g,
    'href="./icon-192.png"'
  );
  
  // Agregar meta tag mobile-web-app-capable
  indexContent = indexContent.replace(
    /<meta name="apple-mobile-web-app-capable" content="yes" \/>/,
    '<meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="mobile-web-app-capable" content="yes" />'
  );
  
  // Reemplazar TODAS las referencias a .js con ?v=timestamp
  indexContent = indexContent.replace(
    /\.js"/g,
    `.js?v=${timestamp}"`
  );
  
  console.log('📄 HTML modificado (primeros 500 chars):', indexContent.substring(0, 500));
  console.log(`📊 Tamaño: ${originalLength} -> ${indexContent.length}`);
  
  fs.writeFileSync(distIndexPath, indexContent);
  console.log(`✅ Rutas cambiadas a static/ y cache buster añadido: ?v=${timestamp}`);
  
  // Crear favicon.ico simple (1x1 transparente)
  const faviconPath = path.join(__dirname, 'dist', 'favicon.ico');
  if (!fs.existsSync(faviconPath)) {
    // ICO de 1x1 pixel transparente
    const icoBuffer = Buffer.from([0,0,1,0,1,0,1,1,0,0,1,0,24,0,48,0,0,0,22,0,0,0,40,0,0,0,1,0,0,0,2,0,0,0,1,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,0,0,0,0]);
    fs.writeFileSync(faviconPath, icoBuffer);
    console.log('✅ favicon.ico creado');
  }
  
  // Copiar icon-192.png si Expo no lo generó
  const icon192Path = path.join(__dirname, 'dist', 'icon-192.png');
  if (!fs.existsSync(icon192Path)) {
    const sourceIcon = path.join(__dirname, 'assets', 'icon.png');
    if (fs.existsSync(sourceIcon)) {
      fs.copyFileSync(sourceIcon, icon192Path);
      console.log('✅ icon-192.png copiado');
    }
  }
  
  // 3. Verificar que index.html existe
  if (!fs.existsSync(distIndexPath)) {
    throw new Error('index.html no fue generado por expo export');
  }
  console.log('✅ index.html generado correctamente');
  
  // 4. Crear .nojekyll para evitar problemas con Jekyll
  const nojekyllPath = path.join(__dirname, 'dist', '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Archivo .nojekyll creado');
  
  // 5. Actualizar el manifest.json para GitHub Pages
  const manifestPath = path.join(__dirname, 'dist', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.start_url = '/avalon-game/';
    manifest.scope = '/avalon-game/';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Manifest.json actualizado para GitHub Pages');
  }
  
  // 6. Crear CNAME si se especifica un dominio personalizado
  const customDomain = process.env.CUSTOM_DOMAIN;
  if (customDomain) {
    const cnamePath = path.join(__dirname, 'dist', 'CNAME');
    fs.writeFileSync(cnamePath, customDomain);
    console.log(`✅ CNAME creado para ${customDomain}`);
  }
  
  console.log('🚀 Build para GitHub Pages completado exitosamente!');
  console.log('📍 URL esperada: https://alexillio22.github.io/avalon-game/');
  
} catch (error) {
  console.error('❌ Error durante el build:', error.message);
  process.exit(1);
}
