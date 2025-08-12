const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Obtener todas las IPs disponibles
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filtrar IPv4, no internas y activas
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

// Verificar que la carpeta dist existe
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: La carpeta "dist" no existe.');
  console.log('📝 Ejecuta primero: npm run build-web');
  process.exit(1);
}

// Mapa de tipos MIME
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
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} (desde ${req.connection.remoteAddress})`);

  // Obtener ruta del archivo
  let urlPath = req.url.split('?')[0]; // Remover query params
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, urlPath);
  
  // Seguridad: prevenir acceso fuera de dist
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Función para servir archivo
  const serveFile = (filepath, contentType) => {
    fs.readFile(filepath, (error, content) => {
      if (error) {
        console.error(`Error leyendo ${filepath}:`, error.message);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Archivo no encontrado');
      } else {
        const headers = {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        };
        
        res.writeHead(200, headers);
        res.end(content);
        console.log(`✅ Servido: ${path.basename(filepath)} (${content.length} bytes)`);
      }
    });
  };

  // Verificar si el archivo existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Archivo no encontrado, servir index.html para PWA routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      console.log(`📄 Sirviendo index.html para: ${urlPath}`);
      serveFile(indexPath, 'text/html; charset=utf-8');
    } else {
      // Archivo encontrado, determinar tipo MIME
      const extname = path.extname(filePath).toLowerCase();
      const mimeType = mimeTypes[extname] || 'application/octet-stream';
      serveFile(filePath, mimeType);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Puerto ${PORT} está en uso. Prueba con otro puerto.`);
  } else {
    console.error('❌ Error del servidor:', err);
  }
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  const localIPs = getLocalIPs();
  // Forzar IP para red 192.168.1.x
  const forcedIP = '192.168.1.139'; // Usamos la misma IP base que el iPhone
  const wifiIP = localIPs.find(ip => ip.startsWith('192.168.1.')) || forcedIP;
  
  console.log(`🎮 Avalon PWA corriendo en puerto ${PORT}`);
  console.log(`📂 Sirviendo desde: ${DIST_DIR}`);
  console.log(`\n🌐 URLs disponibles:`);
  console.log(`   Local:     http://localhost:${PORT}`);
  console.log(`   Local:     http://127.0.0.1:${PORT}`);
  
  localIPs.forEach(ip => {
    const marker = ip.startsWith('192.168.1.') ? '👈 USAR ESTA IP' : '';
    console.log(`   Red:       http://${ip}:${PORT} ${marker}`);
  });
  
  // Mostrar todas las IPs posibles en 192.168.1.x
  for (let i = 100; i <= 150; i++) {
    console.log(`   Prueba:    http://192.168.1.${i}:${PORT}`);
  }
  
  console.log(`\n📱 Para iPhone (en red 192.168.1.x):`);
  if (wifiIP) {
    console.log(`   🎯 URL principal: http://${wifiIP}:${PORT}`);
  }
  console.log(`   1. Abre Safari en iPhone`);
  console.log(`   2. Ve a la URL marcada con 👈`);
  console.log(`   3. Toca compartir (📤) → "Añadir a pantalla de inicio"`);
  console.log(`\n🔥 iPhone IP detectada: 192.168.1.139`);
  console.log(`🔥 PC debe estar en la misma red: 192.168.1.x`);
  console.log(`🛑 Para detener: Ctrl+C`);
});
