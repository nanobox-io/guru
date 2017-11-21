import PlansShim from './plans-shim'

export default class MasterShim {

  constructor() {
    this.data = {
      // Set to true and this will behave as a modal
      isModal : true,

      // `register`, `login`, `reset`  -  defaults to : register
      accountDefaultScreen : 'register',

      // Set this if we want to send them somewhere after logging in / creating account
      redirectAfterLogin: null,

      // Info about what the user is trying to do as far as plan selection
      planSelection : {
        category      : 'platform', //  'platform', 'collaboration', 'support' ::  The category to choose, or the category to start with if `pickAllPlans` is true.
        pickAllPlans  : true,       // Set as true to force the user to choose a plan for each category, false to just pick the above category
        requireTeam   : null,       // Set as true to not allow the user to select a solo plan (can be null)
      },

      // Info about the user's current state and current'y selected plans
      user : {
        isLoggedIn       : false,
        hasPaymentMethod : null,
        teamName         : "Current Team Name", // Can be undefined
        currentPlans : {
          platform      : 'scale',
          collaboration : 'solo',
          support       : 'pro',
        },
        currentTeams:[
          {id:"abcd1", name:"Core Team"},
          {id:"abcd2", name:"Development Team"},
          {id:"abcd3", name:"Alpha Centauri"},
          {id:"abcd4", name:"Jungle Bros"}
        ],
      },

      // All the plan details
      plans : new PlansShim().data,
    }
  }

  // Modifying the shim to simulate various scenarios

  login() {
    this.data.user.isLoggedIn = true;
  }

  addPaymentMethod() {
    this.data.user.hasPaymentMethod = true
  }

  setFirstPlan(category='platform', pickAllPlans=true) {
    this.data.planSelection.category     = category
    this.data.planSelection.pickAllPlans = pickAllPlans
  }

  newFromPricingPage(hasSelectedFree) {
    this.data.user.currentPlans = null;
    this.data.user.currentTeams = null;
    this.data.user.teamName     = null;
    if( hasSelectedFree ){
      this.data.redirectAfterLogin = "http://google.com"
    }
  }

  isTeam() {
    this.data.user.currentPlans.collaboration = 'team'
  }

  isUser() {
    this.data.user.currentPlans.collaboration = 'solo'
  }

  getToken() {
    return `eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI2OTVkNmE1ZjZiNzNkOWRlYjQ2MmZkMjkwZjBhNTM4Mzg3MTU4OTBlMWZmNGFhMGY0Y2MzM2YxZTQ1NzJiZmVjfGNyZWF0ZWRfYXQ9MjAxNy0wMS0wM1QxOTowMzoxNC4yNzYyMTM4MjkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=`
  }

}

/*
Scenarios:

1) Login / Creating an account

2) Selecting a plan from pricing page, not logged in

3) Selecting a plan from pricing page, is logged in

4) Upgrading a plan from the dashboard


*/
