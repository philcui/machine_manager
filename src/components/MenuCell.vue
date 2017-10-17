<template>
  <div class="cell">
    <img class="cell-icon" :src="menuCell.imgSrc" alt="">
    <span class="cell-name">{{menuCell.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    menuCell: Object
  }
}
</script>

<style lang='less' scoped>
.cell {
  flex: 1;
  height: 1.61rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
