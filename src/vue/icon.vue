<script type="text/babel">
export default {
  name: 'icon',
  props:{
    scale  : {type:Boolean, dafault:false},
    width  : {type:String,  dafault:null},
    height : {type:String,  dafault:null},
  },
  mounted(){
    if( !this.scale ){
      let size = this.$el.querySelector('svg').getAttribute('viewBox').split(' ')
      this.$el.style.cssText = `width: ${size[2]}px; height: ${size[3]}px; `
    }
    if(this.width != null){
      this.$el.style.width = this.width
    }
    if(this.height != null){
      this.$el.style.height = this.height
    }
  }
}
</script>

<!--
  **** H T M L ****
-->

<template lang="pug">
  .icon
    slot
</template>
