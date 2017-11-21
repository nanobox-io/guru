<script type="text/babel">
import check from '../assets/svg/check.svg'

export default {
  name: 'success',
  components:{check}
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .success
    check(class="checker")
    .txt Complete
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" >
  .success {background: #1CADF2; width:170px; height:170px; display: flex; align-items: center; justify-content: center; @include caps(white, 13px); border-radius: 50%; flex-direction: column;
    .checker{ width:60px; margin:20px 0 10px; 
      *{fill:white}
    }
  }
</style>
