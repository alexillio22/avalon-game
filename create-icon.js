#!/usr/bin/env node

// Script para crear un icono simple SVG que luego se puede convertir a PNG
const fs = require('fs');
const path = require('path');

const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1a1a2e"/>
  <text x="256" y="380" font-size="300" text-anchor="middle" fill="#ffd700">🏰</text>
</svg>`;

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'icon.svg'), svgIcon);
console.log('✅ Icon SVG created in assets/icon.svg');
console.log('⚠️ Para mejor resultado, convierte este SVG a PNG de 512x512 usando una herramienta online');
console.log('   Por ahora, el build script copiará este SVG como fallback');
