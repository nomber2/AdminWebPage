// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import scriptLoader from 'script-loader';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fly from 'flyio';
import 'flyio/dist/npm/fly'
import echarts from 'echarts'
import 'echarts/dist/echarts'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(scriptLoader);
Vue.use(ElementUI);
Vue.use(fly);
Vue.use(echarts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
