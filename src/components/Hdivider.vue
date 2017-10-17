<template>
  <div class="divider">
    <div class="line"></div>
    <div class="text">机友圈精华</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.divider {
  height: 0.3rem;
  position: relative;
  margin-left: 0.9rem;
  margin-right: 0.9rem;
  .line {
    border-top: 1px solid @theme-color;
    width: 100%;
    position: absolute;
    top: 0.19rem;
  }
  .text{
    position: absolute;
    left: 50%;
    margin-left: -1rem;
    background-color: white;
    padding-left: 0.33rem;
    padding-right: 0.33rem;
    color: @theme-color;
    font-size: 0.27rem;
  }
}
</style>
