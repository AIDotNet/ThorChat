import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import compression from 'vite-plugin-compression';


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
  plugins: [react(),
    compression({
      verbose: true, // 如果你想看到压缩的详细输出
      disable: false, // 不禁用压缩
      threshold: 10240, // 只压缩大于10KB的资源
      algorithm: 'brotliCompress', // 使用gzip压缩
      ext: '.br', // 压缩文件的扩展名
      deleteOriginFile:true,
      
    })],
})
