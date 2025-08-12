const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Mapa de tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  
  // Si la ruta no existe, servir index.html (para PWA routing)
  if (!fs.existsSync(filePath) && path.extname(filePath) === '') {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // Archivo no encontrado, servir index.html para PWA
        fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Archivo no encontrado');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Error del servidor: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=86400' // Cache por 24 horas
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Avalon PWA corriendo en:`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Red:      http://172.26.45.23:${PORT}`);
  console.log(`\n📱 Para acceder desde iPhone:`);
  console.log(`   1. Asegúrate de estar en la misma red WiFi`);
  console.log(`   2. Abre Safari en iPhone y ve a: http://172.26.45.23:${PORT}`);
  console.log(`   3. Toca el botón de compartir y "Añadir a pantalla de inicio"`);
  console.log(`\n🔥 La app funcionará offline después de la primera carga!`);
  console.log(`\n🛑 Para detener el servidor, presiona Ctrl+C`);
});
