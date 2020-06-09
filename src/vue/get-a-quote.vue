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
      p At this time we are no longer able to offer support to unpaid Nanobox customers. To be notified of DigitalOcean's upcoming application platform products, please visit
      a(href="www.digitalocean.com/nanobox") www.digitalocean.com/nanobox
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
