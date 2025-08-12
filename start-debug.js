#!/usr/bin/env node

// Script para diagnosticar problemas de conectividad con Expo
const { execSync } = require('child_process');
const os = require('os');

console.log('🔍 Diagnosticando conectividad...\n');

// Obtener información de red
const networkInterfaces = os.networkInterfaces();
const wifiInterfaces = Object.keys(networkInterfaces).filter(name => 
  name.toLowerCase().includes('wifi') || 
  name.toLowerCase().includes('wlan') ||
  name.toLowerCase().includes('ethernet')
);

console.log('📡 Interfaces de red disponibles:');
wifiInterfaces.forEach(interfaceName => {
  const addresses = networkInterfaces[interfaceName];
  addresses.forEach(addr => {
    if (addr.family === 'IPv4' && !addr.internal) {
      console.log(`   ${interfaceName}: ${addr.address}`);
    }
  });
});

console.log('\n🌐 URLs que deberías poder usar:');
wifiInterfaces.forEach(interfaceName => {
  const addresses = networkInterfaces[interfaceName];
  addresses.forEach(addr => {
    if (addr.family === 'IPv4' && !addr.internal) {
      console.log(`   http://${addr.address}:19006 (para navegador)`);
      console.log(`   exp://${addr.address}:19000 (para Expo Go)`);
    }
  });
});

console.log('\n🛠️  Comandos recomendados para probar:');
console.log('   npm run start-tunnel   (si hay problemas de red)');
console.log('   npm run start-local    (solo en este dispositivo)');
console.log('   npm run start-clear    (limpiar caché)');

console.log('\n🚀 Iniciando servidor...\n');
