import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { VITE_API_URL } from './utils/env.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />,
)

// 添加js引用
const script = document.createElement('script')
script.src = `${VITE_API_URL}/js/env.js`
document.body.appendChild(script)
