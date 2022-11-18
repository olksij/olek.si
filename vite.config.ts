import { defineConfig } from "vite"

import vue from "@vitejs/plugin-vue"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  //plugins: [vue(), viteSingleFile()],
  build: {
    assetsInlineLimit: 65536 // 64 kb
  }
});