#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando build para GitHub Pages...');

// 1. Ejecutar el build normal de Expo
const { execSync } = require('child_process');

try {
  console.log('📦 Ejecutando expo export con --clear y --reset-cache...');
  execSync('npx expo export -p web --output-dir dist --clear --no-minify', { stdio: 'inherit' });
  
  // 2. SOBRESCRIBIR con nuestro index.html personalizado
  console.log('📝 Copiando index.html personalizado...');
  const customIndexPath = path.join(__dirname, 'index.html');
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(customIndexPath)) {
    fs.copyFileSync(customIndexPath, distIndexPath);
    console.log('✅ index.html personalizado copiado');
  } else {
    console.log('⚠️ No se encontró index.html personalizado, usando el generado por Expo');
  }
  
  // 2.5 Añadir query string al JS para forzar recarga
  console.log('🔄 Añadiendo cache buster al JavaScript...');
  let indexContent = fs.readFileSync(distIndexPath, 'utf8');
  const timestamp = Date.now();
  indexContent = indexContent.replace(
    /AppEntry-([a-z0-9]+)\.js/g,
    `AppEntry-$1.js?v=${timestamp}`
  );
  fs.writeFileSync(distIndexPath, indexContent);
  console.log(`✅ Cache buster añadido: ?v=${timestamp}`);
  
  // 3. Verificar que index.html existe en dist
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
