<script type="text/babel">
import check from '../assets/svg/check.svg'
export default {
  name: 'card',
  props:{
    val            : {type:String},
    value          : {type:String},
    clickable      : {type : Boolean, default:true}
  },
  components:{check},
  methods:{
    onClick() {
      if(this.clickable)
        this.$emit('input', this.val)
    }
  },
  watch:{
    value(){
      this.$emit('changed', this.value)
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .card( @click="onClick" v-bind:class="{ selected: value == val, 'non-clickable':!clickable }" )
    slot
    .check
      check(class="checker")
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" >
  $transition-speed : 150ms;
  .card             {width:138px; height:175px; border-radius:10px; display: flex; flex-direction: column; align-items: center; background:#ECF3F6; padding:25px 0 0; color:#33658C; cursor:pointer; transition:all $transition-speed; position: relative;
    &.non-clickable {cursor:default}
    .title          {@include caps(#33658C, 14px); text-align: center; }
    .check          {background: white; width:29px; height:29px; border-radius: 50%; position: absolute; bottom:-15px; right:10px; box-shadow:0px 2px 3px rgba(black, 0.2); display: flex; align-items: center; justify-content: center; transition:all $transition-speed;
      .checker      {width:18px; opacity:0; margin-left:1px; margin-top:2px; }
    }

    &.selected      {background:#5dccff; color:#163D5C;
      .title        {color:#163D5C}
      .check        {
        .checker    {opacity:1;
        }
      }
      .xvg          {
        svg *       {stroke:#0C2F4B; }
      }
    }
    &.short,
    &.team          {padding-top:15px; }
    &.short         {height:92px;}
    &.team          {color:#163D5C;
      .title        {color:#163D5C;}
      &.selected    {background:#ECF3F6; box-shadow: 0 0 0px 3px #2DB9F9;
        .check      {background: #2DB9F9; transition: all $transition-speed;
          .checker  {opacity:1;
            *       {fill:white;}
          }
        }
      }
    }
  }
</style>
