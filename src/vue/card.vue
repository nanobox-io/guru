<script type="text/babel">
export default {
  name: 'card',
  props:['val', 'value'],
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
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .card          {width:138px; height:175px; border-radius:10px; display: flex; flex-direction: column; align-items: center; background:#ECF3F6; padding:25px 0 0; color:#33658C; cursor:pointer; transition:all 150ms; 
    .title       {@include caps(#33658C, 14px);}
    .cost        {font-size:25px; font-weight: $bold; letter-spacing:0.08em;
      &:before   {content:"$";}
      &:after    {content:"/mo"; font-size:14px; font-style: italic; font-weight: $semibold; letter-spacing: initial; }
    }
    &.selected   {background:#2DB9F9; color:#163D5C;
      .title     {color:#163D5C}
    }
    &.short,
    &.team       {padding-top:15px; }
    &.short      {height:92px;}
    &.team       {color:#163D5C;
      .title     {color:#163D5C;}
      &.selected {background:#ECF3F6; box-shadow: 0 0 0px 3px #2DB9F9; }
    }
  }
</style>
