<script type="text/babel">
import card from './card'
import {add, dropdown} from 'lexi'

export default {
  name: 'choose-collaboration',
  props:['model', 'team-name'],
  components:{card, add, dropdown},
  data(){
    let obj = {
      validating:false,
      otherTeam:"",
    }
    if(this.model.user.currentTeams.length > 0)
      obj.otherTeam = this.model.user.currentTeams[0].id
    return obj;
  },
  methods:{
    validateTeam() {
      this.validating = true
      this.model.validateTeamName( (results)=>{
        this.validating = false
        if(results.error)
          this.$emit('error', results.error)
        else
          this.$emit('next')
      } )
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .choose-collaboration(v-bind:class="{'is-team':model.isTeam, 'is-user':model.isUser, 'no-teams':model.user.currentTeams.length == 0, 'require-team':model.requireTeam}")
    .main-title Collaboration
    .plans
      .plan(v-for="plan in model.plans.collaboration" :key="plan.id" :class="plan.id")
        card.team(v-model="model.selectedPlans.collaboration" :val="plan.id" )
          .title {{ plan.name }}
          .icon
            .img(:class="plan.id")
          .cost {{ plan.cost }}
        .features
          .feature(v-for="feature in plan.features") {{ feature }}

      .new-team(v-if="!model.isTeam" @click="$emit('go-create-team')")
        .hexagon
        .img(class="team")
        add.hex.medium
        .txt Create a New Team

      .existing-teams(v-if="!model.isTeam && model.user.currentTeams.length > 0")
        .txt Manage an existing team
        .gray-box
          dropdown(v-model="otherTeam" )
            .option(v-for="team in model.user.currentTeams" :key="team.id" :value="team.id") {{team.name}}
        .btn(@click="$emit('manage-team', otherTeam)") Go

    .proceed
      transition(name="fade")
        input(type="text" v-model="model.teamName" v-if="model.selectedPlans.collaboration != 'solo'" :placeholder="`Name Your team`" v-bind:disabled="model.isTeam")
      .back(@click="$emit('prev')") Back
      .btn.lifecycle(@click="validateTeam" v-bind:class="{ing:validating}") Next
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  @import "mixins";
  .choose-collaboration {
    .plans              {justify-content: flex-start;
      .plan             {margin-right:37px;
        .card           {
          .icon         {height:90px; margin-top:5px; }
        }
      }
    }
    input         {background:#EDF4F7; margin-right:30px; height:55px; flex-grow: 1; padding-left:20px; font-weight: $semibold;
      &:disabled  {background: white; padding: 0; }
    }
    @import 'collaboration';

    // The new team button
    .new-team   {position: relative; width:100px; height:130px; cursor:pointer; margin-top:20px; display:none;
      > *       {position: absolute; left: 50%; transform: translateX(-50%);}
      .img      {top:12px; }
      .lexi-add {bottom:10px; @include shadowed();}
      .hexagon  {@include hexagon(90px, #D0DADE);   }
      .txt      {bottom:-10px; @include caps(#11A7ED, 14px); text-align: center; white-space: nowrap;}
      &:hover   {
        .hexagon{@include hexagon(90px, #AAE4FA); }
        .txt    {color:#0084CF;}
      }
    }

    // The existing team ui
    .existing-teams {display: flex; flex-direction: column; width: 270px; margin-top:20px; display: none;
      .txt          {font-size:14px; font-weight:$semibold; font-style:italic; color:#8FABBF; margin-bottom:5px;}
      .gray-box     {background:#EDF4F7; padding:20px 10px 25px 20px; }
      .btn          {background:#1FAEF0; @include caps(white, 13px); display: inline-block; align-self:flex-end; padding:6px 12px; margin-top:3px; cursor:pointer;
        &:hover   {background:#007DD7;}
      }
    }

    // transitions:
    .fade-enter-active, .fade-leave-active {
      transition: opacity 300ms;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
    &.require-team,
    &.is-team         {
      .plan.solo      {display: none; }
    }
    &.is-user         {
      .new-team       {display:initial; }
      .existing-teams {display:flex; }
      .plan.team      {display: none; }
      .plan.business  {display: none; }
      .plans          {justify-content: space-between;  }
      &.no-teams      {
        .plans        {justify-content: flex-start; }
        .new-team     {margin-left:60px; }
      }
    }
  }
</style>
