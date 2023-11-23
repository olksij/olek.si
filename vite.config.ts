import { defineConfig } from 'vite'

export default defineConfig(() => ({
  //build:  { assetsInlineLimit:      36864, }, // 36 kb
  define: { __VERCEL_INSIGHTS_ID__: JSON.stringify(process.env.VERCEL_ANALYTICS_ID), },
}));
