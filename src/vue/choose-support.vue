<script type="text/babel">
import card from './card'
export default {
  name: 'choose-support',
  props:['model'],
  components:{card},
  data(){
    return{
      selectedPlan:'community'
    }
  }
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
        card.short(v-model="selectedPlan" :val="plan.id")
          .title {{ plan.name }}
          .cost {{ plan.cost }}
        .features
          .header(v-if="plan.extends != null") {{ plan.extends }}
          .feature(v-for="feature in plan.features") {{ feature }}
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .choose-support {}
</style>
