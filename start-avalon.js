const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: La carpeta "dist" no existe.');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`📱 ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  let filePath = path.join(DIST_DIR, urlPath);
  
  const serveFile = (filepath, contentType) => {
    fs.readFile(filepath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Archivo no encontrado');
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        res.end(content);
        console.log(`✅ Servido: ${path.basename(filepath)}`);
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
  console.log(`🎮 Avalon PWA iniciado correctamente`);
  console.log(`📱 Tu iPhone está en: 192.168.1.139`);
  console.log(`🖥️ Tu PC debe estar en: 192.168.1.xxx`);
  console.log(`\n🔍 ENCUENTRA TU IP DE PC:`);
  console.log(`   1. Abre Command Prompt en Windows`);
  console.log(`   2. Ejecuta: ipconfig`);
  console.log(`   3. Busca "Adaptador de LAN inalámbrica"`);
  console.log(`   4. Anota la IPv4 (192.168.1.xxx)`);
  console.log(`\n📱 LUEGO EN SAFARI (iPhone):`);
  console.log(`   Ve a: http://[tu-ip-de-pc]:3000`);
  console.log(`   Ejemplo: http://192.168.1.100:3000`);
  console.log(`\n🎯 URLs posibles para probar:`);
  
  // Generar algunas IPs comunes en esa red
  const commonIPs = [100, 101, 102, 103, 104, 105, 110, 120, 130, 150, 200];
  commonIPs.forEach(lastOctet => {
    console.log(`   http://192.168.1.${lastOctet}:3000`);
  });
  
  console.log(`\n🔥 Cuando funcione, verás logs aquí arriba!`);
  console.log(`🛑 Para detener: Ctrl+C`);
});

server.on('error', (err) => {
  console.error('❌ Error:', err.message);
});
