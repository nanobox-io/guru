require('nanobox-core-styles/scss/_base.scss')
import MasterShim from './shims/master-shim'
import guru from '../src/main.js'
import Vue from 'vue'

Vue.config.productionTip = false;

window.shim = new MasterShim()
// window.shim.login()
// window.shim.redirectAfterLogin()

let callbacks = {

  /*
  Note on callbacks:
  Most of these callbacks receive a `cb` parameter. After completing the actions,
  call the `cb` method passing an object. Adding `error` to the object will display
  an error to the user. EX : `cb({ error: 'Some Error' })`
  */

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

  // Retrieve a token
  getToken(cb) {
    setTimeout( ()=> {
      cb( { token: shim.getToken() } )
    }, Math.random() * 2200 );
  },

  // Called to validate the team / business name
  validateTeamName(teamName, cb) {
    console.log( `Validating team name : '${teamName}'...` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },


  /*
  Create a payment method
    kind  : String - 'card', 'paypal'
    nonce : String
    cb       : callback method (see above)
  */
  createPaymentMethod(kind, nonce, cb) {
    console.log( `Creating a '${kind}' payment method with a nonce of ${nonce}` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  /*
  Create a team
    newPlan  : String - 'team', 'business'
    teamName : String
    cb       : callback method (see above)
  */
  changeCollaborationPlan(newPlan, teamName, cb) {
    console.log( `Changing the collaboration plan to '${newPlan}' with the name ${teamName}` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  /*
  Change the platform plan
    newPlan : String - 'deploy', 'scale', etc..
  */
  changePlatformPlan(newPlan, cb) {
    console.log( `Changing the platform to the '${newPlan}' plan` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  /*
  Change the support plan
    newPlan : String - 'community', 'basic', 'pro', etc..
  */
  changeSupportPlan(newPlan, cb) {
    console.log( `Changing the support plan to the '${newPlan}' plan` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  /*
  Called after the user has updated / saved his plan
  */
  saveComplete() {
    console.log( "Save complete!" )
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
