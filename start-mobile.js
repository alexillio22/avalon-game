const { spawn } = require('child_process');
const os = require('os');

// Obtener la IP local
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const ip = getLocalIP();
console.log(`🌐 IP Local detectada: ${ip}`);
console.log(`📱 En Expo Go, usa la URL: exp://${ip}:8081`);

// Iniciar expo con configuración específica
const expo = spawn('npx', ['expo', 'start', '--host', 'lan'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

expo.on('error', (err) => {
  console.error('Error al iniciar Expo:', err);
});
