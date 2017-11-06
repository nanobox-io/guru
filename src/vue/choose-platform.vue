<script type="text/babel">
import card from './card'
import {xvg} from 'lexi'

import automate from '../assets/svg/compiled/automate.svg'
import deploy   from '../assets/svg/compiled/deploy.svg'
import monitor  from '../assets/svg/compiled/monitor.svg'
import protect  from '../assets/svg/compiled/protect.svg'
import scale    from '../assets/svg/compiled/scale.svg'
// import icon     from './icon'
export default {
  name: 'choose-platform',
  props:['model'],
  components:{card, xvg, automate, deploy, monitor, protect, scale },
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-platform
    .main-title Pick your Platform
    .plans
      .plan(v-for="plan in model.plans.platform" :key="plan.id" v-bind:class="{hide:plan.beta}")
        card(v-model="model.user.currentPlans.platform" :val="plan.id" )
          .title {{ plan.name }}
          .icon-wrapper
            xvg
              component(:is="plan.name")
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
  .choose-platform {
    .icon-wrapper{height: 50px; margin: 14px 0 22px; display: flex; align-items: center; }
  }
</style>
