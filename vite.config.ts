import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(), 
        presetAttributify(),
        presetIcons()
      ],
      // 可选：添加自定义规则
      rules: [
        // 在这里添加自定义规则
      ],
      // 可选：添加快捷方式
      shortcuts: {
        // 在这里添加快捷方式
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    // 自定义代理规则
    proxy: {
      '/api': {
        target: 'https://mirrors.cqupt.edu.cn/',
        changeOrigin: true
      }
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }
})
