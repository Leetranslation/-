import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误捕获:', err, info)
  // 不阻止应用运行，只记录错误
}

// 全局未捕获的Promise rejection处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的Promise rejection:', event.reason)
  // 阻止默认的错误提示
  event.preventDefault()
})

// 全局错误捕获
window.addEventListener('error', (event) => {
  // 过滤掉webpack-dev-server的错误
  if (event.message && event.message.includes('webpack-dev-server')) {
    event.preventDefault()
    return false
  }
  console.error('全局错误:', event.error)
  return false
})

app.use(router)
app.mount('#app')





