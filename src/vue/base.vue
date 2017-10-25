<script type="text/babel">
import choosePlatform      from './choose-platform'
import chooseCollaboration from './choose-collaboration'
import chooseSupport       from './choose-support'
import finalize            from './finalize'
import {x}                 from 'lexi'
export default {
  name  : 'guru',
  props : ['model', 'callbacks'],
  components : {x, choosePlatform, chooseCollaboration, chooseSupport, finalize},
  data() {return {
    currentPage : 'finalize'
  }},
  methods    : {},
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .guru
    x.close
    choose-platform(:model="model" v-if="currentPage == 'platform'" )
    choose-collaboration(:model="model" v-if="currentPage == 'collaborate'" )
    choose-support(:model="model" v-if="currentPage == 'support'" )
    finalize(:model="model" v-if="currentPage == 'finalize'" )
</template>

<!--
  **** C S S ****
-->

<style lang="scss" >
  .guru         {width:965px; height:615px; padding:45px 63px; background: white; position: relative;
    @import 'shared';
    .close      {position: absolute;right:15px; top:15px; }
  }
</style>
