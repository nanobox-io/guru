<script type="text/babel">
import card from './card'
export default {
  name: 'choose-collaboration',
  props:['model'],
  components:{card},
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-collaboration
    .main-title Choose your Collaboration
    .plans
      .plan(v-for="plan in model.plans.collaboration" :key="plan.id")
        card.team(v-model="model.user.currentPlans.collaboration" :val="plan.id")
          .title {{ plan.name }}
          .icon
            .img(:class="plan.id")
          .cost {{ plan.cost }}
        .features
          .feature(v-for="feature in plan.features") {{ feature }}
    .proceed
      transition(name="fade")
        input(type="text" v-model="model.user.teamName" v-if="model.user.currentPlans.collaboration != 'solo'" :placeholder="`Name Your ${model.user.currentPlans.collaboration}`")
      .back(@click="$emit('prev')") Back
      .btn.lifecycle(@click="$emit('next')") Next
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .choose-collaboration {
    .plans              {justify-content: flex-start;
      .plan             {margin-right:37px;
        .card           {
          .icon         {height:90px; margin-top:5px; }
          .img          {background: url(../assets/images/sprite.png); width: 100px; height:30px;
            &.solo      {width:31px; height:82px; background-position-x:-1px; }
            &.team      {width:61px; height:86px; background-position:-35px -1px;}
            &.business  {width:84px; height:82px; background-position:-99px -2px;}
          }
        }
      }
    }
    input               {background:#EDF4F7; margin-right:30px; height:55px; flex-grow: 1; padding-left:20px; font-weight: $semibold;}


    // transitions:
    .fade-enter-active, .fade-leave-active {
      transition: opacity 300ms;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
  }
</style>
