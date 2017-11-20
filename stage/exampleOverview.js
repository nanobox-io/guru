require('nanobox-core-styles/scss/_base.scss')
import OverviewShim from './shims/overview-shim'
import {overview}   from '../src/main.js'
import Vue          from 'vue'

Vue.config.productionTip = false;

let callbacks = {
  managePlatform() {
    console.log( "The user wants to manage the platform" )
  },

  manageTeams() {
    console.log( "The user wants to manage their Teams" )
  },

  manageSupport() {
    console.log( "the user wants to manage support" )
  }
}

window.shim = new OverviewShim()

new Vue({
  el       : '#overview',
  template : '<overview :model="model" :callbacks="callbacks"/>',
  data     : {
    model     : shim.data,
    callbacks : callbacks,
  },
  components:{ overview }
})
