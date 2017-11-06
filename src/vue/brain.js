import Sequence from 'sequence'

export default class Brain {

  constructor(model, base) {
    this.model = model
    this.base  = base
    this.init()
  }

  init() {
    let ar;
    if(this.model.planSelection == null){
      ar = []

    // Selecting a single plan
    }else if( !this.model.planSelection.pickAll ){
      ar = [ this.model.planSelection.category, 'finalize' ]

    // Selecting all plan categories
    }else{
      ar = ['platform', 'collaboration', 'support', 'finalize']
      // Move the category of choice to the front of the list
      let category = (this.model.planSelection.category == null)? 'platform' : this.model.planSelection.category
      let i = ar.indexOf(category);
      ar.splice(i,1)
      ar.unshift(category)
    }

    this.sequence = new Sequence(ar)
  }

  handleLoggedIn() {
    if(this.model.postLoginAction.do == 'pick.plan' || this.model.postLoginAction.do == 'pick.all.plans')
      this.base.currentPage = this.sequence.currentItem
    else if(this.model.postLoginAction.do == 'redirect')
      window.location = this.model.postLoginAction.params[0];
  }

}
