<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import account             from './account'
import {x, flux}           from 'lexi'

export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize, account, flux},
  data() {
    let obj =  {
      currentPage : 'platform',
    }
    if( !this.model.user.isLoggedIn )
      obj.currentPage = 'account'
    return obj
  },
  methods    : {
    nextSlide() {
      if(this.currentPage == 'platform'){
        this.currentPage = 'collaboration'
      }else if(this.currentPage == 'collaboration'){
        this.currentPage = 'support'
      }else if(this.currentPage == 'support'){
        this.currentPage = 'finalize'
      }
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
