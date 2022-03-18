import vue from '@vitejs/plugin-vue'
/**
 * @type {import('vite').UserConfig}
 */
 const config = {
    plugins: [vue()],
    esbuild: {
      jsxFactory: 'vue.h',
      jsxFragment: 'vue.Fragment'
    }
  }
  
  export default config