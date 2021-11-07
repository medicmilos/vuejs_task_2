import Vue from "vue"
import Gists from "./Gists"

Vue.config.productionTip = false

new Vue({
  render: h => h(Gists)
}).$mount("#app")
