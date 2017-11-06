export default class Shim {

  constructor() {
    this.data = {
      /*
      ########  ##          ###    ######## ########  #######  ########  ##     ##
      ##     ## ##         ## ##      ##    ##       ##     ## ##     ## ###   ###
      ########  ##       ##     ##    ##    ######   ##     ## ########  ## ### ##
      ##        ##       #########    ##    ##       ##     ## ##   ##   ##     ##
      ##        ######## ##     ##    ##    ##        #######  ##     ## ##     ##
      */
      platform:[
        {
          id:'deploy',
          name:'deploy',
          cost:0,
          extends:null,
          features:[
            'Deploy apps to the cloud provider of your choice',
            'Manage your apps with the intuitive nanobox dashboard'
          ]
        },
        {
          id:'scale',
          name:'scale',
          cost:25,
          extends:'deploy',
          features:[
            'Split apps across multiple servers',
            'Create horizontal clusters for code redundancy and efficiency'
          ]
        },
        {
          id:'monitor',
          name:'monitor',
          cost:50,
          extends:'scale',
          state:'beta',
          features:[
            'Realtime monitoring',
            'Create custom alerts based on container and server usage'
          ]
        },
        {
          id:'automate',
          name:'automate',
          cost:75,
          extends:'monitor',
          state:'alpha',
          features:[
            'Configure your app to automatically scale up / down',
            'Add additional automation based on health or other app events'
          ]
        },
        {
          id:'protect',
          name:'protect',
          cost:100,
          extends:'automate',
          state:'alpha',
          features:[
            'Data Redundancy',
            'Automatic Data Backups'
          ]
        },
      ],

      /*
       ######   #######  ##       ##          ###    ########   #######  ########     ###    ######## ####  #######  ##    ##
      ##       ##     ## ##       ##        ##   ##  ##     ## ##     ## ##     ##  ##   ##     ##     ##  ##     ## ####  ##
      ##       ##     ## ##       ##       ##     ## ########  ##     ## ########  ##     ##    ##     ##  ##     ## ## ## ##
      ##       ##     ## ##       ##       ######### ##     ## ##     ## ##   ##   #########    ##     ##  ##     ## ##  ####
       ######   #######  ######## ######## ##     ## ########   #######  ##     ## ##     ##    ##    ####  #######  ##    ##
      */
      collaboration:[
        {
          id:'solo',
          name:'solo user',
          cost:0,
        },
        {
          id:'team',
          name:'Team',
          cost:50,
          features:[
            'Collaborate with unlimited users',
          ]
        },
        {
          id:'business',
          name:'Business',
          cost:100,
          features:[
            'Collaborate with unlimited users',
            'Organize apps into groups'
          ]
        },
      ],

      /*
       ######  ##     ## ########  ########   #######  ########  ########
      ##       ##     ## ##     ## ##     ## ##     ## ##     ##    ##
       ######  ##     ## ########  ########  ##     ## ########     ##
            ## ##     ## ##        ##        ##     ## ##    ##     ##
       ######   #######  ##        ##         #######  ##     ##    ##
      */
      support:[
        {
          id:'community',
          name:'community',
          cost:0,
          features:[
            'Join our very active slack channel',
            'In depth guides &amp; documentation'
          ]
        },
        {
          id:'basic',
          name:'Basic',
          cost:50,
          features:[
            '9-5pm MST Ticket support',
          ]
        },
        {
          id:'pro',
          name:'Pro',
          cost:100,
          features:[
            '24-7 Prioritized Ticket support',
          ]
        },
        {
          id:'dedicated',
          name:'Dedicated',
          cost:0,
          contact:true,
          features:[
            'We work hands on with your team to  configure your apps and your infrastructure',
            'We are available 24/7 via a dedicated phone number',
            'Your team is given a private slack channel with direct access to our team'
          ]
        },
        {
          id:'managed',
          name:'Fully<br/>Managed',
          cost:0,
          contact:true,
          extends:'dedicated',
          features:[
            'We configure your infrastructure and your apps ',
            'We monitor your infrastructure and actively respond to fluctuations in usage or health',
            'We send weeky usage and health reports'
          ]
        },
      ]
    }
  }

}
