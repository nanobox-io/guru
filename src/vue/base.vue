<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import account             from './account'
import {x, flux, errors}   from 'lexi'
import Sequence            from 'sequence'
import Brain               from './brain'
import LocalModel          from './local-model'

export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize, account, flux, errors},
  data() {
    let localModel = new LocalModel(this.model, this.callbacks)
    let brain = new Brain(this.model, this)
    let obj =  {
      localModel  : localModel,
      firstItem   : brain.sequence.firstItem,
      currentPage : brain.sequence.currentItem,
      brain       : brain,
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

    onError(error){
      this.localModel.error = error
    },

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
  .main(v-bind:class="{'modal-mode':model.isModal}")
    .guru(v-bind:class="{account:currentPage == 'account'}")
      x.close(@click="callbacks.close")
      errors(:errors="localModel.error")
      account(v-if="currentPage == 'account'" :model="localModel" @register="callbacks.register" @login="callbacks.login" @forgot="callbacks.resetPassword" key="account" @error="onError")
      choose-platform(:model="localModel" v-if="currentPage == 'platform'" @next="nextSlide" @prev="prevSlide" key="platform" v-bind:class="{first:firstItem == 'platform'}" )
      choose-collaboration(:model="localModel" v-if="currentPage == 'collaboration'" @next="nextSlide" @prev="prevSlide" key="collaboration" v-bind:class="{first:firstItem == 'collaboration'}" @manage-team="callbacks.manageTeam" @go-create-team="callbacks.goCreateNewTeam" @error="onError")
      choose-support(:model="localModel" v-if="currentPage == 'support'" @next="nextSlide" @prev="prevSlide" key="support" v-bind:class="{first:firstItem == 'support'}" )
      finalize(:model="localModel" :getToken="callbacks.getToken" v-if="currentPage == 'finalize'" @change="currentPage = arguments[0]" @prev="prevSlide" key="finalize" v-bind:class="{first:firstItem == 'finalize'}" @submit="this.localModel.submit" @error="onError")
</template>

<!--
  **** C S S ****
-->

<style lang="scss" >
  .guru         {width:965px; height:615px; padding:45px 63px; background: white; position: relative; transition:all 400ms $easeInOut;
    @import 'shared';
    .close      {position: absolute;right:15px; top:15px; }
    &.account   {width:560px; }
    > .first    {
      .back     {display: none; }
    }
    .errors     {position: absolute; top:0; margin-bottom: 12px; margin-top: -60px; box-shadow: 0 2px 4px rgba(black,0.4);}
  }
  holder   {position: absolute; margin: auto;
            left: 0;  right: 0;
  }
  .main.modal-mode{position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(#0090d4,0.82); display: flex; align-items: center; justify-content: center; z-index: 10000; }
</style>
