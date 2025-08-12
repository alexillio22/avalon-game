#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3001; // Puerto diferente para no conflictar con otros servidores
const BASE_PATH = '/avalon-game'; // Simular la ruta de GitHub Pages

// Tipos MIME para diferentes archivos
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'font/eot'
};

const server = http.createServer((req, res) => {
  // Configurar CORS para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let pathname = url.parse(req.url).pathname;
  
  // Remover el base path si está presente (simular GitHub Pages)
  if (pathname.startsWith(BASE_PATH)) {
    pathname = pathname.substring(BASE_PATH.length);
  }
  
  // Si la ruta está vacía, servir index.html
  if (pathname === '' || pathname === '/') {
    pathname = '/index.html';
  }

  // Construir ruta al archivo
  const filePath = path.join(__dirname, 'dist', pathname);

  console.log(`📥 Solicitud: ${req.url} -> ${pathname} -> ${filePath}`);

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si no existe, intentar servir index.html (comportamiento SPA)
      const indexPath = path.join(__dirname, 'dist', 'index.html');
      console.log(`⚠️  Archivo no encontrado, sirviendo index.html: ${indexPath}`);
      
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Página no encontrada');
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }

    // Leer el archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
        return;
      }

      // Determinar tipo de contenido
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log('🚀 Servidor de prueba GitHub Pages iniciado!');
  console.log('');
  console.log('📱 URLs de prueba:');
  console.log(`   Directo: http://localhost:${PORT}`);
  console.log(`   Con base path: http://localhost:${PORT}${BASE_PATH}`);
  console.log('');
  console.log('🔧 Para probar desde iPhone:');
  console.log('   1. Obtén tu IP: ipconfig (Windows) / hostname -I (Linux/Mac)');
  console.log(`   2. Usa: http://[tu-ip]:${PORT}${BASE_PATH}`);
  console.log('');
  console.log('✅ Simula exactamente el comportamiento de GitHub Pages');
  console.log('⚡ Presiona Ctrl+C para detener');
});
