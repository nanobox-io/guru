<script type="text/babel">
import card from './card'
export default {
  name: 'choose-platform',
  props:['model'],
  components:{card},
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-platform
    .main-title Pick your Platform
    .plans
      .plan(v-for="plan in model.plans.platform" :key="plan.id")
        card(v-model="model.user.currentPlans.platform" :val="plan.id")
          .title {{ plan.name }}
          .cost {{ plan.cost }}
        .features
          .header(v-if="plan.extends != null") {{ plan.extends }}
          .header.none(v-else)
          .feature(v-for="feature in plan.features") {{ feature }}
    .proceed
      .back(@click="$emit('prev')") Back
      .btn.lifecycle(@click="$emit('next')") Next
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .choose-platform {}
</style>
