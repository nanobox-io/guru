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
shim.login()
// shim.addPaymentMethod()
// shim.isTeam()
// shim.isUser()
shim.removeMessage()
// shim.setFirstPlan('support', false)
// shim.setFirstPlan('collaboration', true, true)
// shim.newFromPricingPage()
// shim.newFromPricingPage( true )

// shim.data.planSelection = {}
shim.data.planSelection.category = null
shim.data.planSelection.choice = null
// shim.data.planSelection.pickAllPlans = null
// shim.data.planSelection.isNewTeam = null

// let dataEx = {"redirectAfterLogin":null,"user":{"isLoggedIn":true,"hasPaymentMethod":false,"teamName":null,"currentPlans":null,"currentTeams":[]},"plans":{"collaboration":[{"id":"solo","name":"Solo","cost":0,"state":"stable","extends":null,"features":[]},{"id":"team","name":"Team","cost":50,"state":"stable","extends":null,"features":["Collaborate with unlimited users"]},{"id":"business","name":"Business","cost":100,"state":"stable","extends":null,"features":["Collaborate with unlimited users","Organize apps into groups and control user access"]}],"platform":[{"id":"deploy","name":"Deploy","cost":0,"state":"stable","extends":null,"features":["Deploy apps to the cloud provider of your choice","Manage your apps with the intuitive Nanobox dashboard"]},{"id":"scale","name":"Scale","cost":25,"state":"stable","extends":"deploy","features":["Split apps across multiple servers","Create horizontal clusters for code redundancy and efficiency"]},{"id":"monitor","name":"Monitor","cost":50,"state":"alpha","extends":"scale","features":["Realtime monitoring","Create custom alerts based on container and server usage"]},{"id":"automate","name":"Automate","cost":75,"state":"alpha","extends":"monitor","features":["Configure your app to automatically scale up / down","Add additional automation based on health or other app events"]},{"id":"protect","name":"Protect","cost":100,"state":"alpha","extends":"automate","features":["Data Redundancy","Automatic Data Backups"]}],"support":[{"id":"community","name":"Community","cost":0,"state":"stable","extends":null,"features":["Join our very active slack channel","In depth guides \u0026 documentation"]},{"id":"basic","name":"Basic","cost":50,"state":"stable","extends":null,"features":["9-5pm MST Ticket support"]},{"id":"pro","name":"Pro","cost":100,"state":"stable","extends":null,"features":["24-7 Prioritized Ticket support"]},{"id":"dedicated","name":"Dedicated","cost":0,"state":"stable","extends":"pro","features":["We work hands on with your team to configure your apps and your infrastructure","We are available 24/7 via a dedicated phone number","Your team is given a private slack channel with direct access to our team"]},{"id":"managed","name":"Fully Managed","cost":0,"state":"stable","extends":"dedicated","features":["We configure your infrastructure and your apps","We monitor your infrastructure and actively respond to fluctuations in usage or health","We send weeky usage and health reports"]}]},"isModal":true,"planSelection":{"category":"","choice":"","pickAllPlans":false}}
// console.log( dataEx )
// console.log( shim.data )
// shim.data = dataEx
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
