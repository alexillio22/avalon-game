#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando build para GitHub Pages...');

// 1. Ejecutar el build normal de Expo
const { execSync } = require('child_process');

try {
  console.log('📦 Ejecutando expo export...');
  execSync('npx expo export -p web --output-dir dist', { stdio: 'inherit' });
  
  // 2. Verificar que index.html existe en dist
  const distIndexPath = path.join(__dirname, 'dist', 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    throw new Error('index.html no fue generado por expo export');
  }
  console.log('✅ index.html generado correctamente');
  
  // 3. Crear .nojekyll para evitar problemas con Jekyll
  const nojekyllPath = path.join(__dirname, 'dist', '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Archivo .nojekyll creado');
  
  // 4. Actualizar el manifest.json para GitHub Pages
  const manifestPath = path.join(__dirname, 'dist', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.start_url = '/avalon-game/';
    manifest.scope = '/avalon-game/';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Manifest.json actualizado para GitHub Pages');
  }
  
  // 5. Crear CNAME si se especifica un dominio personalizado
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
