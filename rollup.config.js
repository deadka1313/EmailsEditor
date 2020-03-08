import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svgr from '@svgr/rollup';

import pkg from './package.json';
import url from '@rollup/plugin-url';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import prettier from 'rollup-plugin-prettier';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: 'dist/index.min.js',
            format: 'iife',
            name: 'EmailsEditor',
        },
    ],
    plugins: [
        external(),
        postcss({
            plugins: [autoprefixer],
            modules: false,
            extract: true,
            minimize: true,
            sourceMap: true,
        }),
        url(),
        svgr(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
            exclude: ['src/**/*.test.(tsx|ts)'],
        }),
        commonjs(),
        prettier({
            tabWidth: 2,
            singleQuote: false,
        }),
    ],
};
