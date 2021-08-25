import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/styles/index.less'
import UiIcon from './components/ui/Icon.vue'

const app = createApp(App).use(store).use(router).use(Antd)
app.component('ui-icon', UiIcon)
app.mount('#app')
