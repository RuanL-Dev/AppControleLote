const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurações para resolver problemas de Node.js
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.nodeModulesPaths = [__dirname + '/node_modules'];

module.exports = config; 