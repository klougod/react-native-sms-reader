import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
};

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: false,
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      declaration: true,
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
  ],
  external: Object.keys(globals),
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser({ format: { comments: false } }));
}

export default config;
