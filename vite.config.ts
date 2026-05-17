import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from '@react-router/dev/vite'

export default defineConfig({
  plugins: [
    reactRouter(),   // remplace react() — gère React + SSR automatiquement
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
