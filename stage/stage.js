require('nanobox-core-styles/scss/_base.scss')

import PlansShim from './shims/plans-shim'
import UserShim  from './shims/user-shim'
import guru from '../src/main.js'
import Vue from 'vue'

Vue.config.productionTip = false;

window.shim = new PlansShim()

let callbacks = {

}

new Vue({
  el       : '#app',
  template : '<guru :model="model" :callbacks="callbacks"/>',
  data     : {
    model     : shim.data,
    callbacks : callbacks
  },
  components:{ guru }
})
