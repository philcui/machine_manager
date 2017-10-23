<template>
  <span class="tag">{{tagName}}</span>
</template>

<script>
export default {
  props: {
    tagName: String
  }
}
</script>

<style lang='less' scoped>
  .tag{
    border: 1px solid @theme-color;
    font-size: 0.186rem;
    border-radius: 0.05rem;
    margin-right: 0.1rem;
    color: @theme-color;
    padding: 0.05rem;
  }
</style>
