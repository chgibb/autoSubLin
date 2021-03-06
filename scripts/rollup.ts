
const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

let args = process.argv.slice(2);

const inOpts = {
  input: args[0],
  external: [],
  plugins: [
      resolve({preferBuiltins: true}),
      commonjs()
    ]
};

const outOpts = {
  file: args[1],
  format: "cjs"
};

(async function() {
  const bundle = await rollup.rollup(inOpts);
  await bundle.write(outOpts);
})();