const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desactivar caché de Metro completamente
config.resetCache = true;
config.cacheStores = [];

module.exports = config;
