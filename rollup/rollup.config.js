import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import pkg from '../package.json';
const tsconfig = './tsconfig.json';
const peerDependencies = Object.keys(pkg.peerDependencies);
const external = id => peerDependencies.some(dep => id.startsWith(dep));
const plugins = [
    typescript({ tsconfig, clean: true }),
    cleanup({ comments: 'none' }),
    filesize(),
];
const watch = { include: ['src/**'] };
const esOptions = {
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
const options = [esOptions];
export default options;
