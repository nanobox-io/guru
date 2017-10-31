<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import account             from './account'
import {x}                 from 'lexi'
export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize, account},
  data() {
    let obj =  {
      currentPage : 'platform'
    }
    if( !this.model.user.isLoggedIn )
      obj.currentPage = 'account'
    return obj
  },
  methods    : {
    nextSlide() {
      if(this.currentPage == 'platform'){
        this.currentPage = 'collaborate'
      }else if(this.currentPage == 'collaborate'){
        this.currentPage = 'support'
      }else if(this.currentPage == 'support'){
        this.currentPage = 'finalize'
      }
    }
  },
  mounted(){

  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .guru(v-bind:class="{account:currentPage == 'account'}")
    x.close
    account(v-if="currentPage == 'account'" model="model")
    choose-platform(:model="model" v-if="currentPage == 'platform'" @next="nextSlide")
    choose-collaboration(:model="model" v-if="currentPage == 'collaborate'" @next="nextSlide")
    choose-support(:model="model" v-if="currentPage == 'support'" @next="nextSlide")
    finalize(:model="model" v-if="currentPage == 'finalize'" )
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
