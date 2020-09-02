import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "src/main.js",
  output: {
    file: "game.bundle.js",
    format: "iife",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" }), serve()],
};
