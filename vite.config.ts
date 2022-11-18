import { defineConfig } from "vite"

export default defineConfig({
  //plugins: [vue(), viteSingleFile()],
  build: {
    assetsInlineLimit: 65536 // 64 kb
  }
});