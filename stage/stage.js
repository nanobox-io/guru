require('nanobox-core-styles/scss/_base.scss')
import MasterShim from './shims/master-shim'
import guru from '../src/main.js'
import Vue from 'vue'

Vue.config.productionTip = false;

window.shim = new MasterShim()
let callbacks = {
  login(data, cb){
    console.log( `Logging in. username:[${data.user}], password:[${data.password}]` )
    setTimeout( ()=> {
      cb({});
      console.log( shim.data.user.isLoggedIn )
      shim.data.user.isLoggedIn = true
    }, Math.random() * 1200 );
  },
  register(data, cb){
    console.log( `Registering:` )
    for ( let key in data ) {
      console.log( `  ${key} : ${data[key]}` )
    }
    setTimeout( ()=> { cb({}) }, Math.random() * 1200 );
  },
  resetPassword(data, cb){
    console.log( `Resetting password for: ${data.email}` )
    setTimeout( ()=> { cb({}) }, Math.random() * 1200 );
  }
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
