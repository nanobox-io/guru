<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import account             from './account'
import {x, flux, errors}   from 'lexi'
import Sequence            from 'sequence'
import Brain               from './brain'

export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize, account, flux, errors},
  data() {
    let brain = new Brain(this.model, this)
    let obj =  {
      firstItem   : brain.sequence.firstItem,
      currentPage : brain.sequence.currentItem,
      brain       : brain,
      error       : '',
      // This may be better in a localModel
      plans       : this.getDefaultPlans(),
    }
    if( !this.model.user.isLoggedIn )
      obj.currentPage = 'account'
    return obj
  },
  methods    : {
    nextSlide() {
      this.brain.sequence.next()
      this.currentPage = this.brain.sequence.currentItem
    },
    prevSlide() {
      this.brain.sequence.prev()
      this.currentPage = this.brain.sequence.currentItem
    },
    submitPlans(paymentInfo, cb) {
      this.callbacks.setPlans(this.plans, this.plans.teamName, paymentInfo, (data)=>{
        cb()
        this.error = data.error
      })
    },
    onError(error){
      this.error = error
    },
    // Infer the plans based on what they may currently have selected, and what they may be trying to select
    getDefaultPlans() {
      let obj = {
        platform      : 'deploy',
        collaboration : 'solo',
        support       : 'community',
        teamName      : this.getTeamName()
      }
      // Set the values based on the current plans
      if(this.model.user.currentPlans != null){
        if(this.model.user.currentPlans.platform != null)
          obj.platform = this.model.user.currentPlans.platform
        if(this.model.user.currentPlans.collaboration != null)
          obj.collaboration = this.model.user.currentPlans.collaboration
        if(this.model.user.currentPlans.support != null)
          obj.support = this.model.user.currentPlans.support
      }
      // Set the user's default selection if there is one
      if(this.model.planSelection != null){
        if(this.model.planSelection.choice != null){
          if(this.model.planSelection.category != null){
            obj[this.model.planSelection.category] = this.model.planSelection.choice
          }
        }
      }
      return obj
    },
    getTeamName() {return this.model.user.teamName != null ? this.model.user.teamName : '' }
  },
  computed:{
    loggedIn(){return this.model.user.isLoggedIn},
  },
  watch:{
    loggedIn(isLoggedIn){
      if(isLoggedIn)
        this.brain.handleLoggedIn()
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .guru(v-bind:class="{account:currentPage == 'account'}")
    x.close(@click="callbacks.close")
    errors(:errors="error")
    account(v-if="currentPage == 'account'" :model="model" @register="callbacks.register" @login="callbacks.login" @forgot="callbacks.resetPassword" key="account" @error="onError")
    choose-platform(:model="model" :plans="plans" v-if="currentPage == 'platform'" @next="nextSlide" @prev="prevSlide" key="platform" v-bind:class="{first:firstItem == 'platform'}" )
    choose-collaboration(:model="model" :plans="plans" :validateTeamName="callbacks.validateTeamName" v-if="currentPage == 'collaboration'" @next="nextSlide" @prev="prevSlide" key="collaboration" v-bind:class="{first:firstItem == 'collaboration'}" @error="onError")
    choose-support(:model="model" :plans="plans" v-if="currentPage == 'support'" @next="nextSlide" @prev="prevSlide" key="support" v-bind:class="{first:firstItem == 'support'}" )
    finalize(:model="model" :getToken="callbacks.getToken" :plans="plans" v-if="currentPage == 'finalize'" @change="currentPage = arguments[0]" @prev="prevSlide" key="finalize" v-bind:class="{first:firstItem == 'finalize'}" @submit="submitPlans" @error="onError")
</template>

<!--
  **** C S S ****
-->

<style lang="scss" >
  .guru         {width:965px; height:615px; padding:45px 63px; background: white; position: relative; transition:all 400ms $easeInOut; margin:0 auto;
    @import 'shared';
    .close      {position: absolute;right:15px; top:15px; }
    &.account   {width:560px; }
    > .first    {
      .back     {display: none; }
    }
    .errors     {position: absolute; top:0; margin-bottom: 12px; margin-top: -60px; box-shadow: 0 2px 4px rgba(black,0.4);}
  }
</style>
