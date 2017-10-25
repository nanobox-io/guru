<script type="text/babel">
import card from './card'
export default {
  name: 'choose-platform',
  props:['model'],
  components:{card},
  data(){
    return{
      selectedPlan:'deploy'
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-platform
    .main-title Pick your Platform
    .plans
      .plan(v-for="plan in model.plans.infrastructure" :key="plan.id")
        card(v-model="selectedPlan" :val="plan.id")
          .title {{ plan.name }}
          .cost {{ plan.cost }}
        .features
          .header(v-if="plan.extends != null") {{ plan.extends }}
          .header.none(v-else)
          .feature(v-for="feature in plan.features") {{ feature }}
    .proceed
      .btn.lifecycle Next
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .choose-platform {}
</style>
