require('nanobox-core-styles/scss/_base.scss')
import MasterShim from './shims/master-shim'
import guru       from '../src/main.js'
import {overview} from '../src/main.js'
import Vue        from 'vue'

Vue.config.productionTip = false;

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
      cb( {error:"asdf"} )
    }, Math.random() * 2200 );
  },

  // Called to create a new team
  createTeam(teamName, cb) {
    console.log( `Creating a new team nameed : '${teamName}'...` )
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
  Change the plan
    category : String - 'platform', 'collaboration', 'support'
    newPlan  : String - 'deploy', 'scale', etc..
  */
  changePlan(category, newPlan, cb) {
    console.log( `Changing the '${category}' to the '${newPlan}' plan` )
    setTimeout( ()=> {
      cb( {} )
    }, Math.random() * 2200 );
  },

  // Called when a user wants to manage a different team
  manageTeam(teamId) {
    console.log( `Manage the team with the id : '${teamId}'` )
  },

  // Called when leaving to create a new team
  goCreateNewTeam() {
    console.log( "The user is leaving to create a new team" )
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

window.shim = new MasterShim()
shim.removeMessage()
// shim.login()
// shim.addPaymentMethod()
// shim.isTeam()
// shim.isUser()
// shim.addMessage("title")
// shim.setFirstPlan('support', false)
// shim.setFirstPlan('collaboration', true, true)
shim.newFromPricingPage(true)
// shim.newFromPricingPage( true )

// shim.data.planSelection = {}
// shim.data.planSelection.category = null
// shim.data.planSelection.choice = null
// shim.data.planSelection.pickAllPlans = null
// shim.data.planSelection.isNewTeam = null

window.myVue = new Vue({
  el       : '#app',
  template : '<guru :model="model" :callbacks="callbacks" v-if="isActive" />',
  data     : {
    model     : shim.data,
    callbacks : callbacks,
    isActive  : true
  },
  components:{ guru }
})
