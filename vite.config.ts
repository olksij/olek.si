import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    assetsInlineLimit: 36864, // 36 kb
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        404:   resolve(__dirname, '404.html'),
      }
    }
  }
});