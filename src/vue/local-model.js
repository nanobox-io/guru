import Promise from 'bluebird'

export default class LocalModel {

  constructor(model, callbacks) {
    window.mod = this
    this.callbacks            = callbacks
    this.originalModel        = model
    this.accountDefaultScreen = model.accountDefaultScreen
    this.user                 = model.user
    this.plans                = model.plans
    this.teamName             = model.user.teamName
    this.isNewTeam            = this.isNewTeam()
    this.startedWithPlans     = this.originalModel.user.currentPlans != null && !this.isNewTeam
    this.selectedPlans        = this.getDefaultPlans()
    this.error                = ''
    this.redirectAfterLogin   = model.redirectAfterLogin
    this.planSelection        = model.planSelection
    this.isCreatingAccount    = model.isCreatingAccount
    // Collaboration
    this.canCreateTeam        = model.canCreateTeam
    this.isTeam               = this.isTeam()
    this.isUser               = this.isUser()
    this.initialMessage       = this.getDefaultInitialMessage()
    this.isComplete           = false
    this.setDefaults()
  }

  // Set any defaults that are not defined
  setDefaults(model) {
    if(this.teamName == null)
      this.teamName = ''
    if(this.user.currentTeams == null)
      this.user.currentTeams  = []
    if(this.user.hasPaymentMethod == null)
      this.user.hasPaymentMethod = false
    // If the user is trying to select the free platform plan, call the on complete after login
    if(this.planSelection!= null){
      if(this.planSelection.category == 'platform' && this.planSelection.choice == 'deploy')
        this.skipPricingChoices = true
    }
  }

  // Infer the plans based on what they may currently have selected, and what they may be trying to select
  getDefaultPlans() {
    let obj = {
      platform      : 'deploy',
      collaboration : 'solo',
      support       : 'community',
      teamName      : this.getTeamName()
    }

    if(this.isNewTeam)
      obj.collaboration = 'team'

    // Set the values based on the current plans
    if(this.startedWithPlans){
      if(this.originalModel.user.currentPlans.platform != null)
        obj.platform = this.originalModel.user.currentPlans.platform
      if(this.originalModel.user.currentPlans.collaboration != null)
        obj.collaboration = this.originalModel.user.currentPlans.collaboration
      if(this.originalModel.user.currentPlans.support != null)
        obj.support = this.originalModel.user.currentPlans.support
    }
    // Set the user's default selection if there is one
    if(this.originalModel.planSelection != null){
      if(this.originalModel.planSelection.choice != null){
        if(this.originalModel.planSelection.category != null){
          obj[this.originalModel.planSelection.category] = this.originalModel.planSelection.choice
        }
      }
    }
    return obj
  }

  getDefaultInitialMessage() {
    if(this.originalModel.initialMessage != null){
      let obj = {
        title   : "Plan Upgrade Required",
        message : "You will need to upgrade your platform to do this action",
        btnTxt  : "Manage Plans"
      }
      if(this.originalModel.initialMessage.title != null)
        obj.title = this.originalModel.initialMessage.title
      if(this.originalModel.initialMessage.message != null)
        obj.message = this.originalModel.initialMessage.message
      if(this.originalModel.initialMessage.btnTxt != null)
        obj.btnTxt = this.originalModel.initialMessage.btnTxt
      return obj;
    }
    return null;
  }

  getTeamName() {return this.originalModel.user.teamName != null ? this.originalModel.user.teamName : '' }

  // Ensure the team name is valid
  validateTeamName(cb) {
    if(this.selectedPlans.collaboration != 'solo' ){
      if(this.user.teamName != this.teamName){
        this.callbacks.validateTeamName(this.teamName, cb)
        return
      }
    }
    cb({})
  }

  // When the user is ready to submit everything, run all of the following
  submit = (paymentMethod, cb)=>{
    this.paymentMethod = paymentMethod
    this.createTeam()
    .then(this.addPaymentMethod)
    .then(this.changePlan.bind(this, 'collaboration'))
    .then(this.changePlan.bind(this, 'platform'))
    .then(this.changePlan.bind(this, 'support'))
    .then(cb)
    .then(this.submitSuccess)
    .then(this.callbacks.saveComplete)
    .catch((error)=>{
      this.error = error.message
      cb()
    })
  }

  // Add a payment method if needed
  addPaymentMethod = ()=> {
    return new Promise((resolve, reject)=>{
      if(this.originalModel.user.hasPaymentMethod)
        resolve()
      else{
        this.callbacks.createPaymentMethod(this.paymentMethod.kind, this.paymentMethod.nonce, (results)=>{
          this.handleCbResults(results, resolve, reject)
        })
      }
    })
  }

  // Create a team if needed
  createTeam = ()=> {
    return new Promise((resolve, reject)=>{
      if(!this.isTeam && !this.isUser){
        this.callbacks.createTeam(this.teamName, (results)=>{
          this.handleCbResults(results, resolve, reject)
        })
      }else
        resolve()
    })
  }

  // After validating that the user's selection requires a save,
  // call the callback that will save the user's plan choide
  // @category : ex - 'platform', 'collaboration', 'support'
  changePlan = (category)=> {
    return new Promise((resolve, reject)=>{
      // If the new plan matches the old plan, no need to change it
      if(this.startedWithPlans){
        if(this.selectedPlans[category] == this.originalModel.user.currentPlans[category]){
          resolve()
          return
        }
      }
      // This is a legitimate new plan, change it
      this.callbacks.changePlan(category, this.selectedPlans[category], (results)=>{
        this.handleCbResults(results, resolve, reject)
      })
    })
  }

  submitSuccess = ()=> {
    return new Promise((resolve, reject)=>{
      this.isComplete = true
      setTimeout( ()=> {
        resolve()
      }, 1200 );
    })
  }

  handleCbResults(results, resolve, reject) {
    if(results.error != null)
      reject(new Error(results.error))
    else
      resolve()
  }

  // ------------------------------------ Helpers

  isNewTeam() {
    if(this.originalModel.planSelection == null)
      return false
    if(this.originalModel.planSelection.isNewTeam)
      return true
    return false
  }

  isTeam() {
    if(this.isCreatingAccount)
      return false
    if(!this.startedWithPlans)
      return false
    if(this.originalModel.user.currentPlans.collaboration == 'solo')
      return false
    return true
  }

  isUser() {
    if(this.isCreatingAccount)
      return false
    if(!this.startedWithPlans)
      return false
    if(this.originalModel.user.currentPlans.collaboration == 'solo')
      return true
    return false
  }

}
