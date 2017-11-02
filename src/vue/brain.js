import Sequence from 'sequence'

export default class Brain {

  constructor(model, base) {
    this.model = model
    this.base  = base
    this.init()
  }

  init() {
    let ar;
    // Selecting a single plan
    if(this.model.postLoginAction.do == 'pick.plan'){
      ar = [ this.model.postLoginAction.params[0], 'finalize' ]
    // Selecting all plan categories
    }else if(this.model.postLoginAction.do == 'pick.all.plans'){
      ar = ['platform', 'collaboration', 'support', 'finalize']
      // Move the category of choice to the front of the list
      let i = ar.indexOf(this.model.postLoginAction.params[0]);
      ar.splice(i,1)
      ar.unshift(this.model.postLoginAction.params[0])
    }
    else{
      ar = []
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
