<template>
  <a @click="clickCell" class="cell" :href="menuCell.url" :style="cellStyle">
    <img class="cell-icon" :src="menuCell.imgSrc" alt="">
    <span class="cell-name">{{menuCell.title}}</span>
  </a>
</template>

<script>
//todo outer element should clear float
export default {
  props: {
    menuCell: Object,
    cellStyle: Object,
  },
  methods:{
    clickCell(){
      this.$emit('on-cellclick')
    }
  }
}
</script>

<style lang='less' scoped>
.cell {
  float: left;
  //width: 2.13rem;
  flex: 1;
  height: 1.61rem;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  color: #313131;
  .cell-icon {
    display: block;
    height: 0.46rem;
  }
  .cell-name {
    display: block;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
}
</style>
