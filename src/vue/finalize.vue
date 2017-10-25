<script type="text/babel">
export default {
  name: 'finalize'
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .finalize
    .main-title Review and Finalize
    .summary
      .line-items
        .line
          .category Infrastructure
          .choice Deploy
          .link Change
          .cost 0
        .line
          .category Infrastructure
          .choice Deploy
          .link Change
          .cost 0
        .line
          .category Infrastructure
          .choice Deploy
          .link Change
          .cost 0
      .total.cost
        .label Total
        | 200
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .finalize              {
    .summary             {display: flex;  align-items:flex-end; color:#163D5C; font-size:$semibold;
      .line-items        {flex-grow: 1;
        .line            {display: flex;padding:10px 0; border-bottom:solid 1px #E2E6E7; align-items: baseline;
          .category      {font-size:14px; font-style:italic; min-width:170px; }
          .choice        {@include caps(#163D5C, 14px); margin-right:25px; }
          .link          {color:#06B0FC; cursor:pointer; }
          .cost          {margin-left:auto; font-size:20px; }
          &:last-of-type {border:none; }
        }
      }
      .line-items,
      .total             {background: #EDF4F7; border-radius:6px; display: block; padding:10px 20px; }
      .total             {margin-left:20px; position: relative;
        .label           {content:"Total"; position: absolute; top:-20px; font-size:14px; color:#C3CCD1; letter-spacing: 0; left:0;  }
      }
    }
  }
</style>
