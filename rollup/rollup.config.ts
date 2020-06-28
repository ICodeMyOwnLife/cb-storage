/* eslint-disable import/no-extraneous-dependencies */
import { RollupOptions, Plugin, WatcherOptions, ExternalOption } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import pkg from '../package.json';

const tsconfig = './tsconfig.json';
const peerDependencies = Object.keys(pkg.peerDependencies);
const external: ExternalOption = id =>
  peerDependencies.some(dep => id.startsWith(dep));
const plugins: Plugin[] = [
  typescript({ tsconfig, clean: true }),
  cleanup({ comments: 'none' }),
  filesize(),
];
const watch: WatcherOptions = { include: ['src/**'] };

const esOptions: RollupOptions = {
  input: pkg.source,
  external,
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins,
  watch,
};

const options: RollupOptions[] = [esOptions];

export default options;
