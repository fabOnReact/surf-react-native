module.exports = function (api) {
  api.cache(true);

  // const presets =  ["react-native", "module:react-native-dotenv"];
  const presets = ["module:metro-react-native-babel-preset", "module:react-native-dotenv"]
  const plugins = ["@babel/plugin-transform-flow-strip-types", "@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-nullish-coalescing-operator"];

  return {
    presets,
    plugins
  };
}
