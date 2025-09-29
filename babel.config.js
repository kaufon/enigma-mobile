module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", {
        jsxImportSource: "nativewind"
      }]
    ],
    plugins: [
      // Removido: "nativewind/babel" - não é mais necessário com jsxImportSource
      
      ["module-resolver", {
        root: ["./"],
        alias: {
          "@": "./",
          "tailwind.config": "./tailwind.config.js",
        },
      }],

      // O plugin do Reanimated agora vem do novo pacote "react-native-worklets-core"
      // Ele ainda deve ser o último plugin da lista.
      "react-native-worklets-core/plugin",
    ],
  };
};
