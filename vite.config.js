import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'strip-icons-modulepreload',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(
          /\s*<link rel="modulepreload" crossorigin href="\/assets\/icons-[^"]+">/g,
          '',
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('lucide-react')) {
            return 'icons'
          }

          return undefined
        },
      },
    },
  },
})
