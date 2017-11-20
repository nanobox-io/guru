import PlansShim from './plans-shim'

export default class OverviewShim {

  constructor() {
    this.data = {
      // Info about the user's current state and current'y selected plans
      user : {
        currentPlans : {
          platform      : 'protect',
          collaboration : 'business',
          support       : 'pro',
        },
      },

      // All the plan details
      plans : new PlansShim().data,
    }
  }

}
