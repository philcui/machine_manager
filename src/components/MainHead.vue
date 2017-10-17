<template>
  <div class="mainHead">
    <div class="head">
      <a :class="{isSelected: item.selected}" v-for="(item, index) in items" :key="index" @click="changeSelect(index)">
        {{item.text}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { selected: true, text: '服务' },
        { selected: false, text: '社区' }
      ]
    }
  },
  methods: {
    changeSelect(selectedIndex) {
      this.items = this.items.map((item, index) => {
        selectedIndex === index ? item.selected = true : item.selected = false
        return item
      })
    }
  }
}
</script>

<style lang='less' scoped>
.mainHead {
  background-color: @theme-color;
  height: 0.64rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.head {
  height: 0.4rem;
  width: 1.5rem;
  display: flex;
  a {
    border: 1px solid white;
    flex: 1;
    font-size: 0.2rem;
    display: block;
    text-align: center;
    line-height: 0.4rem;
    color: white;
    border-left: none;
    &:first-child {
      border-left: 1px solid white;
    }
  }
  .isSelected {
    background-color: white;
    color: @theme-color;
  }
}
</style>
