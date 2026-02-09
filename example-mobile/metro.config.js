const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '../src');

const config = getDefaultConfig(projectRoot);

// Watch the library source directory
config.watchFolders = [libraryRoot, path.resolve(projectRoot, '..')];

// Resolve modules from the library source
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(projectRoot, '..', 'node_modules'),
];

// Alias the library to the source
config.resolver.extraNodeModules = {
  'react-native-relatives-tree': libraryRoot,
};

module.exports = withNativeWind(config, {
  input: './config/global.css',
});
