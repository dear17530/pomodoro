import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/app.styl'
import Home from './views/Home.vue'
import List from './views/List.vue'
import VueApexCharts from 'vue-apexcharts'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPen, faUndo, faTrash, faStepForward, faVolumeUp, faTimes, faPlusCircle, faChartLine, faMusic, faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faPlayCircle, faPauseCircle, faArrowAltCircleRight, faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

library.add(faCheck, faPen, faUndo, faTrash, faPlayCircle, faPauseCircle, faStepForward, faVolumeUp, faTimes, faPlusCircle, faChartLine, faMusic, faBars, faTimesCircle, faArrowAltCircleRight, faDotCircle, faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Home', Home)
Vue.component('List', List)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueSweetalert2)

Vue.use(BootstrapVue)

Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
