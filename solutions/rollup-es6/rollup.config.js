import babel from 'rollup-plugin-babel';
import externalGlobals from "rollup-plugin-external-globals";
export default {
  input: 'index.js',
  output: {
    file: 'dist/js/bundle.js',
    format: 'esm'
  },
  plugins: [
    babel(),
    externalGlobals({
      react: "React",
      "react-dom": 'ReactDOM'
    })
  ]
};