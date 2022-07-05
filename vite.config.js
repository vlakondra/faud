import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// import Roll from './rollup.config.js'
//import autoPreprocess from 'svelte-preprocess'


// process.env['MY_TEST'] = 'mytest!!';
process.env.BROWSER = 'firefox';
//import 'dotenv';//).config();

// const env = loadEnv( process.cwd(), '')
// console.log('env',process.env,import.meta.env)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte( {
    configFile: 'svelte.config.js'
  })],
  server:{
    port:3000,
    open:'/index.html',
    app:process.env.BROWSER
  },

  // build: {
  //   rollupOptions: {
  //     // https://rollupjs.org/guide/en/#big-list-of-options
  //     // input:'src/main.js',
  //     //  output:{
  //     //    dir:'public/build',
  //      //   format:'iife',

  //     //   name:'app',
  //     //   // file:'public/build/bundle.js'

  //     // }
  //   }
  // },

  //  css: {
  //   preprocessorOptions: {
  //      scss: {
  //       additionalData: '@use "src/variables.scss" as *;',
  //     },
  //   },
  // },

})
