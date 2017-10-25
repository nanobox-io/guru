<script type="text/babel">
import check from '../assets/svg/check.svg'
export default {
  name: 'card',
  props:['val', 'value'],
  components:{check},
  methods:{
    onClick() {
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
  .card( @click="onClick" v-bind:class="{ selected: value == val }" )
    slot
    .check
      check(class="icon")
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" >
  $transition-speed : 150ms;
  .card           {width:138px; height:175px; border-radius:10px; display: flex; flex-direction: column; align-items: center; background:#ECF3F6; padding:25px 0 0; color:#33658C; cursor:pointer; transition:all $transition-speed; position: relative;
    .title        {@include caps(#33658C, 14px);}
    .check        {background: white; width:29px; height:29px; border-radius: 50%; position: absolute; bottom:-15px; right:10px; box-shadow:0px 2px 3px rgba(black, 0.2); display: flex; align-items: center; justify-content: center; transition:all $transition-speed;
      .icon       {width:18px; opacity:0; margin-left:1px; margin-top:2px; }
    }
    &.selected    {background:#2DB9F9; color:#163D5C;
      .title      {color:#163D5C}
      .check    {
        .icon   {opacity:1;
        }
      }
    }
    &.short,
    &.team        {padding-top:15px; }
    &.short       {height:92px;}
    &.team        {color:#163D5C;
      .title      {color:#163D5C;}
      &.selected  {background:#ECF3F6; box-shadow: 0 0 0px 3px #2DB9F9;
        .check    {background: #2DB9F9; transition: all $transition-speed;
          .icon   {opacity:1;
            * {fill:white;}
          }
        }
      }
    }
  }
</style>
