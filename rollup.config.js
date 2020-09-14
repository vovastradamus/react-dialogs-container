import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = {
  input: "src/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true,
    },
  ],
};
