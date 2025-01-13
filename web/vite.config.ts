import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions:['.js','.jsx','.ts','.tsx']
  },
  define:{
    'process.env': {}
  },
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1025,
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
})
