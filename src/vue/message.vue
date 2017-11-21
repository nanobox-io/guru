<script type="text/babel">
export default {
  name: 'message',
  props:['msg']
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .message
    .main-title {{ msg.title }}
    .txt {{ msg.message }}
    .proceed
      .back(@click="$emit('cancel')") Cancel
      .btn.lifecycle(@click="$emit('go')") {{ msg.btnTxt }}
</template>

<!--
  ***** C S S *****
-->

<style lang="scss" scoped>
  .txt {color:#8FABBF; font-size:17px; font-weight:$semibold; font-style: italic; }
  .proceed{
    .btn{font-size:14px; padding:0 30px; }
  }
</style>
