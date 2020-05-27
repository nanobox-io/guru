<script type="text/babel">
import {xvg} from 'lexi'
import automate from '../assets/svg/compiled/automate.svg'

export default {
  name: 'get-a-quote',
  components:{xvg, automate}
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .get-a-quote
    .content
      .icon
        automate
      p We are updating plan upgrades. In the mean time, contact us and we can quickly upgrade you manually.
      a(href="mailto:hello@nanobox.io") hello@nanobox.io
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .get-a-quote {font-size:18px; font-weight: normal;
    .icon      {width:110px; margin:20px 0; }
    .content   {max-width:350px; margin:0 auto; margin-top:70px; display: flex; align-items: center; flex-direction: column;
      p        {font-size:18px; font-weight: normal; margin-bottom:30px; margin-left:15px; }
      a,
      .phone   {font-size:25px; margin:10px 0; color:#33658C;  }
      a        {border-bottom:solid 1px; }
    }
  }
</style>
