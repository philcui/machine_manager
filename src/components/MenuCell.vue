<template>
  <a class="cell" :href="menuCell.url">
    <img class="cell-icon" :src="menuCell.imgSrc" alt="">
    <span class="cell-name">{{menuCell.title}}</span>
  </a>
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
