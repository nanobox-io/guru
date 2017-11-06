<script type="text/babel">
import {paypal, creditCard, miniNav} from 'payments'
import _ from 'lodash'
export default {
  name: 'finalize',
  components: {paypal, creditCard, miniNav},
  props:['model', 'plans'],
  data(){
    return {
      submitting       : false,
      selectedItem     : 'card',
      hasPaymentMethod : this.model.user.hasPaymentMethod,
      paymentInfo      : {},
    }
  },
  methods:{
    paypalComplete(err, nonce, deviceData){
      this.hasPaymentMethod = true
      this.paymentInfo = {
        kind       : 'paypal',
        nonce      : nonce,
      }
    },
    ccInvalidField(){
      console.log('Braintree says that something the user has entered is invalid')
    },
    ccReadyForSubmit() {
      this.hasPaymentMethod = true
    },
    ccSubmitComplete(nonce) {
      this.paymentInfo = {
        kind       : 'card',
        nonce      : nonce,
      }
      this.submit()
    },
    ccError(err) {
      this.submitting = false
      this.$emit('error',err)
    },

    submitClick() {
      this.submitting = true
      this.$emit('error', '')
      if(this.selectedItem == 'card' && !this.model.user.hasPaymentMethod)
        this.$refs.card.submit()
      else
        this.submit()
    },
    submit() {
      this.$emit('submit', this.paymentInfo, ()=>{
        this.submitting = false
      })
    },

    // Helpers

    getPlan(category) {
      return _.find(this.model.plans[category], {id:this.plans[category] })
    }
  }

}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .finalize
    .main-title Review and Finalize
    .summary
      .line-items
        .line
          .category Platform
          .choice {{getPlan('platform').name}}
          .link(@click="$emit('change', 'platform')") Change
          .cost {{getPlan('platform').cost}}
        .line
          .category Collaboration
          .choice {{getPlan('collaboration').name}}
          .link(@click="$emit('change', 'collaboration')") Change
          .cost {{getPlan('collaboration').cost}}
        .line
          .category Support
          .choice {{getPlan('support').name}}
          .link(@click="$emit('change', 'support')") Change
          .cost {{getPlan('support').cost}}
      .total.cost
        .label Total
        | {{getPlan('platform').cost + getPlan('collaboration').cost + getPlan('support').cost}}
    .pay(v-if="!model.user.hasPaymentMethod")
      .txt Choose a payment method
      mini-nav(@change="selectedItem = arguments[0]")
      paypal( :token="model.brainToken" @complete="paypalComplete" v-if="selectedItem == 'paypal'")
      credit-card( :token="model.brainToken" @complete="ccSubmitComplete" @error="ccError" @ready="ccReadyForSubmit" @invalid="ccInvalidField" ref="card" v-if="selectedItem == 'card'")
    .proceed.right
      .back(@click="$emit('prev')") Back
      .btn.lifecycle(v-bind:class="{disabled:!hasPaymentMethod, ing:submitting}" @click="submitClick") Submit
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .finalize              {
    .pay                 {margin-top:50px; width:580px;
      .txt               {font-size:18px; font-weight:$bold; font-style:italic; color:#33658C; margin-bottom:15px;}
      .mini-nav          {border-bottom:solid 1px #F1F1F1; padding-bottom:25px; margin-bottom:20px;}
    }

    .summary             {display: flex;  align-items:flex-end; color:#163D5C; font-size:$semibold;
      .line-items        {flex-grow: 1;
        .line            {display: flex;padding:10px 0; border-bottom:solid 1px #E2E6E7; align-items: baseline;
          .category      {font-size:14px; font-style:italic; min-width:170px; }
          .choice        {@include caps(#163D5C, 14px); margin-right:25px; }
          .link          {color:#06B0FC; cursor:pointer; }
          .cost          {margin-left:auto; font-size:20px; }
          &:last-of-type {border:none; }
        }
      }
      .line-items,
      .total             {background: #EDF4F7; border-radius:6px; display: block; padding:10px 20px; }
      .total             {margin-left:20px; position: relative;
        .label           {content:"Total"; position: absolute; top:-20px; font-size:14px; color:#C3CCD1; letter-spacing: 0; left:0;  }
      }
    }
  }
</style>
