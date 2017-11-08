import Promise from 'bluebird'

export default class LocalModel {

  constructor(model, callbacks) {
    this.callbacks            = callbacks
    this.originalModel        = model
    this.accountDefaultScreen = model.accountDefaultScreen
    this.user                 = model.user
    this.plans                = model.plans
    this.startedWithPlans             = this.originalModel.user.currentPlans != null
    this.selectedPlans        = this.getDefaultPlans()
    this.error                = ''
  }

  // Infer the plans based on what they may currently have selected, and what they may be trying to select
  getDefaultPlans() {
    let obj = {
      platform      : 'deploy',
      collaboration : 'solo',
      support       : 'community',
      teamName      : this.getTeamName()
    }
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

  getTeamName() {return this.originalModel.user.teamName != null ? this.originalModel.user.teamName : '' }

  // .then(this.createNewTeam.bind(null, 'HAHAHA, worked'))
  submit = (paymentMethod, cb)=>{
    this.addPaymentMethod(paymentMethod)
    .then(this.createNewTeam)
    .then(this.updatePlatform)
    .then(this.updateSupport)
    .then(cb)
    .then(this.callbacks.saveComplete)
    .catch((error)=>{
      this.error = error.message
      cb()
    })
  }

  // Add a payment method if needed
  addPaymentMethod = (paymentMethod)=> {
    return new Promise((resolve, reject)=>{
      if(this.originalModel.user.hasPaymentMethod)
        resolve()
      else{
        this.callbacks.createPaymentMethod(paymentMethod.kind, paymentMethod.nonce, ()=>{
          resolve()
        })
      }
    })
  }

  // Create a new team if needed
  createNewTeam = ()=> {
    return new Promise((resolve, reject)=>{
      // Don't create a new team if they have selected the solo plan
      if( this.selectedPlans.collaboration == 'solo' ){
        resolve()
        return
      }
      // If the new plan matches the old plan, don't create a new one
      if(this.startedWithPlans){
        if(this.selectedPlans.collaboration == this.originalModel.user.currentPlans.collaboration){
          resolve()
          return
        }
      }
      // This is a legitimate new plan, create it
      this.callbacks.createNewTeam(this.selectedPlans.collaboration, this.selectedPlans.teamName, ()=>{
        resolve()
      })
    })
  }

  updatePlatform = ()=> {
    return new Promise((resolve, reject)=>{
      // If they already had a platform plan...
      if( this.startedWithPlans ){
        // ...and that plan matches their current selection, do nothing...
        if( this.selectedPlans.platform == this.originalModel.user.currentPlans.platform ){
          resolve()
          return
        }
      }
      // ..else, set their plan
      this.callbacks.changePlatformPlan(this.selectedPlans.platform, (results)=>{
        this.handleCbResults(results, resolve, reject)
      })
    })
  }

  updateSupport = ()=> {
    return new Promise((resolve, reject)=>{
      // If they already had a support plan...
      if( this.startedWithPlans ){
        // ...and that plan matches their current selection, do nothing...
        if( this.selectedPlans.support == this.originalModel.user.currentPlans.support ){
          resolve()
          return
        }
      }
      // ..else, set their plan
      this.callbacks.changeSupportPlan(this.selectedPlans.support, (results)=>{
        this.handleCbResults(results, resolve, reject)
      })
    })
  }

  handleCbResults(results, resolve, reject) {
    if(results.error != null)
      reject(new Error(results.error))
    else
      resolve()
  }

}
