import Sequence from 'sequence'

export default class Brain {

  constructor(model) {
    this.model = model
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
      let i = ar.indexOf(this.model.postLoginAction.params[0]);
      ar.splice(i,1)
      ar.unshift(this.model.postLoginAction.params[0])
    }
    else{
      return null
    }

    this.sequence = new Sequence(ar)
  }

}
