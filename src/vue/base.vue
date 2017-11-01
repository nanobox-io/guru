<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import account             from './account'
import {x, flux}           from 'lexi'
import Sequence          from 'sequence'

export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize, account, flux},
  data() {
    let sequence = this.createSequence()
    let obj =  {
      currentPage : sequence.currentItem,
      sequence    : sequence
    }
    if( !this.model.user.isLoggedIn )
      obj.currentPage = 'account'
    return obj
  },
  methods    : {
    createSequence() {
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
      return new Sequence(ar)
    },
    nextSlide() {
      this.sequence.next()
      this.currentPage = this.sequence.currentItem
    }
  },
  mounted(){

  },
  computed:{
    loggedIn(){return this.model.user.isLoggedIn},
  },
  watch:{
    loggedIn(isLoggedIn){
      this.currentPage = (isLoggedIn)? 'platform' : 'account';
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .guru(v-bind:class="{account:currentPage == 'account'}")
    x.close
    account(v-if="currentPage == 'account'" model="model" @register="callbacks.register" @login="callbacks.login" @forgot="callbacks.resetPassword" key="account")
    choose-platform(:model="model" v-if="currentPage == 'platform'" @next="nextSlide" key="platform")
    choose-collaboration(:model="model" v-if="currentPage == 'collaboration'" @next="nextSlide" key="collaboration")
    choose-support(:model="model" v-if="currentPage == 'support'" @next="nextSlide" key="support")
    finalize(:model="model" v-if="currentPage == 'finalize'" @change="currentPage = arguments[0]" key="finalize")
</template>

<!--
  **** C S S ****
-->

<style lang="scss" >
  .guru         {width:965px; height:615px; padding:45px 63px; background: white; position: relative; transition:all 400ms $easeInOut; margin:0 auto;
    @import 'shared';
    .close      {position: absolute;right:15px; top:15px; }
    &.account   {width:560px; }
  }
</style>
