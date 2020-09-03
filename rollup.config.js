import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";

const config = {
  input: "src/main.js",
  output: {
    file: "game.bundle.js",
    format: "iife",
  },
  plugins: [resolve()],
};

if (process.env.NODE_ENV === "dev") {
  config.plugins.push(
    serve({
      open: true,
      port: 3000,
    })
  );
}

if (process.env.NODE_ENV == "production") {
  config.plugins.push(terser());
}

export default config;
