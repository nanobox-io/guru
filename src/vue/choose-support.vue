<script type="text/babel">
import card from './card'
export default {
  name: 'choose-support',
  props:['model'],
  components:{card},
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-support
    .main-title Pick a level of support
    .plans
      .plan(v-for="plan in model.plans.support" :key="plan.name")
        card.short(v-model="model.selectedPlans.support" :val="plan.id" v-bind:class="{contact:plan.contact}" :clickable="!plan.contact")
          .title(v-html="plan.name")
          .cost(v-if="!plan.contact") {{ plan.cost }}
          a(v-if="plan.contact" href="https://nanobox.io/contact-us/") Contact Us
        .features
          .header(v-if="plan.extends != null") {{ plan.extends }}
          .feature(v-for="feature in plan.features") {{ feature }}
    .proceed
      .back(@click="$emit('prev')") Back
      .btn.lifecycle(@click="$emit('next')") Next
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" >
  .choose-support {
    .card.contact {
      a           {@include caps(#0076DE, 12px); margin: auto 0 15px 0; border-bottom: solid 1px #79C0FF;
        &:hover   {color:#004E93; border-bottom-color:#004E93; }
      }
      .check      {display: none !important;}
    }
  }
</style>
