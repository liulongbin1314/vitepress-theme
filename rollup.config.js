import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/plugin-typescript'
import typescript from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'

export default {
  input: {
    index: './.vitepress/theme/index.ts'
    // config: './.vitepress/config/index.ts'
  },
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [
    commonjs({}),
    // 配合 commnjs 解析第三方模块
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main', 'browser'],
      extensions: ['.vue', '.ts', '.tsx', '.js']
    }),
    typescript(),
    vuePlugin(),
    postcss()
  ],
  external: ['element-plus', 'vitepress']
}
