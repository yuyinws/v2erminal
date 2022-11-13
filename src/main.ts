import { createApp } from 'vue-termui'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount()

process.on('exit', () => {
  app.unmount()
})
