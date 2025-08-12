const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080; // Puerto alternativo
const DIST_DIR = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: La carpeta "dist" no existe.');
  console.log('📝 Ejecuta primero: npm run build-web');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`📱 ${timestamp} - ${req.method} ${req.url}`);

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  let filePath = path.join(DIST_DIR, urlPath);
  
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  const serveFile = (filepath, contentType) => {
    fs.readFile(filepath, (error, content) => {
      if (error) {
        res.writeHead(404);
        res.end('404 - Archivo no encontrado');
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        res.end(content);
        console.log(`✅ ${path.basename(filepath)} servido`);
      }
    });
  };

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(DIST_DIR, 'index.html');
      serveFile(indexPath, 'text/html; charset=utf-8');
    } else {
      const extname = path.extname(filePath).toLowerCase();
      const mimeType = mimeTypes[extname] || 'application/octet-stream';
      serveFile(filePath, mimeType);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Avalon PWA - Puerto alternativo ${PORT}`);
  console.log(`📱 DESDE iPhone Safari, ve a:`);
  console.log(`   http://192.168.1.160:${PORT}`);
  console.log(`\n🔧 Si no funciona, ejecuta como ADMIN en Windows:`);
  console.log(`   netsh advfirewall firewall add rule name="Avalon8080" dir=in action=allow protocol=TCP localport=8080`);
  console.log(`\n🛑 Ctrl+C para detener`);
});
