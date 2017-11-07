require('nanobox-core-styles/scss/_base.scss')
import MasterShim from './shims/master-shim'
import guru from '../src/main.js'
import Vue from 'vue'

Vue.config.productionTip = false;

window.shim = new MasterShim()
// window.shim.login()
// window.shim.redirectAfterLogin()

let callbacks = {

  // Login
  login(data, cb){
    console.log( `Logging in. username:[${data.user}], password:[${data.password}]` )
    setTimeout( ()=> {
      cb({});
      console.log( shim.data.user.isLoggedIn )
      shim.login()
    }, Math.random() * 1200 );
  },

  // Register a new user
  register(data, cb){
    console.log( `Registering:` )
    for ( let key in data ) {
      console.log( `  ${key} : ${data[key]}` )
    }
    /*
      user          - required
      email         - required
      password      - required
      haveReadTerms - required
      name
      phone
      company
      role
    */
    setTimeout( ()=> {
      cb({})
      shim.login()
    }, Math.random() * 1200 );
  },

  // Reset the password because they forgot
  resetPassword(data, cb){
    console.log( `Resetting password for: ${data.email}` )
    setTimeout( ()=> { cb({}) }, Math.random() * 1200 );
  },

  // Set the plans the user chose & possibly the payment info
  setPlans(plans, teamName, paymentInfo, cb){
    let planStr = '';
    planStr += `Changing plans to:\n`
    planStr += `  platform      : ${plans.platform}\n`
    planStr += `  collaboration : ${plans.collaboration}\n`
    planStr += `  support       : ${plans.support}\n\n`
    planStr += `Team Name is : ${teamName} (may be null)`

    let paymentStr = '';
    if(paymentInfo != null){
      paymentStr += `The payment info the user added:\n`
      paymentStr += `  kind       : ${paymentInfo.kind}\n`
      paymentStr += `  nonce      : ${paymentInfo.nonce}\n`
    }
    console.log(planStr)
    console.log(paymentStr)
    setTimeout( ()=> { cb({error:""}) }, Math.random() * 1200 );
  },

  // Retrieve a token
  getToken(cb) {
    setTimeout( ()=> {
      cb( { token: shim.getToken() } )
    }, Math.random() * 2200 );
  },

  // Called to validate the team / business name
  validateTeamName(teamName, cb) {
    console.log( `Validating team name : ${teamName}...` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  // Called when user clicks the X button
  close(){
    window.location.reload(false)
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
