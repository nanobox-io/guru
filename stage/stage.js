require('nanobox-core-styles/scss/_base.scss')
import MasterShim from './shims/master-shim'
import guru from '../src/main.js'
import Vue from 'vue'

Vue.config.productionTip = false;

window.shim = new MasterShim()
let callbacks = {

}

let shimData = shim.getDefault()

new Vue({
  el       : '#app',
  template : '<guru :model="model" :callbacks="callbacks"/>',
  data     : {
    model     : shimData,
    callbacks : callbacks
  },
  components:{ guru }
})
