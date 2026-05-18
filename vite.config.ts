import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from '@react-router/dev/vite'
import { vercelPreset } from '@vercel/react-router/vite'

export default defineConfig({
  plugins: [
    reactRouter({
      presets: [vercelPreset()],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
