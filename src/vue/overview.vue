<script type="text/babel">
import _ from 'lodash'
import card from './card'
import {xvg} from 'lexi'
import automate from '../assets/svg/compiled/automate.svg'
import deploy   from '../assets/svg/compiled/deploy.svg'
import monitor  from '../assets/svg/compiled/monitor.svg'
import protect  from '../assets/svg/compiled/protect.svg'
import scale    from '../assets/svg/compiled/scale.svg'

export default {
  name       : 'overview',
  props      : ['callbacks', 'model'],
  components : {card, xvg, automate, deploy, monitor, protect, scale},
  data(){
    return{
      dummyModel:"none"
    }
  },
  computed:{
    platformPlan(){
      let index = _.findIndex(this.model.plans.platform, {id: this.model.user.currentPlans.platform})
      return this.model.plans.platform[index]
    },
    collaborationPlan(){
      let index = _.findIndex(this.model.plans.collaboration, {id: this.model.user.currentPlans.collaboration})
      return this.model.plans.collaboration[index]
    },
    supportPlan(){
      let index = _.findIndex(this.model.plans.support, {id: this.model.user.currentPlans.support})
      return this.model.plans.support[index]
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .overview
    .item
      .category Infrastructure
      .box
        .title {{ platformPlan.name }}
        .icon
          xvg
            component(:is="platformPlan.id")
        .cost {{ platformPlan.cost }}
      .btn(@click="callbacks.managePlatform") Details / Manage

    .item
      .category Collaboration
      .box
        .title {{ collaborationPlan.name }}
        .icon
          .img(:class="collaborationPlan.id")
        .cost {{ collaborationPlan.cost }}
      .btn(@click="callbacks.manageTeams") Manage Teams

    .item
      .category Support
      .box
        .title {{ supportPlan.name }}
        .icon
        .cost {{ supportPlan.cost }}
      .btn(@click="callbacks.manageSupport") Details / Manage
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .overview {display: flex; justify-content: space-between; color:#33658C;
    .category{color:#034C66; font-style:italic; font-size:18px; margin-bottom:20px; }
    @import 'shared';
    @import 'collaboration';
    .item{display: flex; flex-direction:column; align-items: center; width:138px;
      .category{}
      .box{height:175px; background: #F7F9FA; display: flex; align-items: center; flex-direction: column; border-radius: 10px; width: 100%; }
      .title{@include caps(#33658C, 14px); margin-top:10px; }
      .icon{height:100px; display: flex; flex-direction: column;align-items: center; justify-content: center}
    }
    .btn{height:38px; color:white; font-size:14px; font-style:italic; width:100%; text-align: center; background: #19AAF4; display: flex; align-items: center; margin-top:20px; cursor: pointer; justify-content: center;
      &:hover   {background:#007DD7;}
    }
  }
</style>
