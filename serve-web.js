const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar todas las rutas enviando el index.html (para PWA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Avalon PWA corriendo en:`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Red:      http://[tu-ip]:${PORT}`);
  console.log(`\n📱 Para acceder desde iPhone:`);
  console.log(`   1. Asegúrate de estar en la misma red WiFi`);
  console.log(`   2. Encuentra tu IP con: ipconfig (Windows) o ifconfig (Mac/Linux)`);
  console.log(`   3. Abre Safari en iPhone y ve a http://[tu-ip]:${PORT}`);
  console.log(`   4. Toca el botón de compartir y "Añadir a pantalla de inicio"`);
  console.log(`\n🔥 La app funcionará offline después de la primera carga!`);
});
