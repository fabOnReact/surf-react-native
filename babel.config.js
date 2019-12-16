module.exports = function (api) {
  api.cache(true);

  const presets =  ["react-native", "module:react-native-dotenv"];
  const plugins = ["@babel/plugin-transform-flow-strip-types", "@babel/plugin-proposal-class-properties"];

  return {
    presets,
    plugins
  };
}
