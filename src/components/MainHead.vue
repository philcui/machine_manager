<template>
  <div class="mainHead">
    <div class="head">
      <a :class="{isSelected: item.selected}" v-for="(item, index) in items" :key="index" @click="changeSelect(index)">
        {{item.text}}
      </a>
    </div>
    <div class="new-message">
      <img src="../assets/icon_message.png" alt="">
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ selected: true, text: "服务" }, { selected: false, text: "社区" }]
    };
  },
  methods: {
    changeSelect(selectedIndex) {
      this.items = this.items.map((item, index) => {
        selectedIndex === index
          ? (item.selected = true)
          : (item.selected = false);
        return item;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.mainHead {
  background-color: white;
  height: 0.64rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .new-message {
    position: absolute;
    right: 0.23rem;
    width: 0.5rem;
    height: 0.64rem;
    line-height: 0.64rem;
    img{
      width: 0.48rem;
      height: 0.48rem;
      vertical-align: middle;
    }
    .dot {
      background-color: #ff0000;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      position: absolute;
      right: -0.05rem;
      top: 0.05rem;
    }
  }
}

.head {
  height: 0.4rem;
  width: 1.5rem;
  display: flex;
  a {
    border: 1px solid #898989;
    flex: 1;
    font-size: 0.2rem;
    display: block;
    text-align: center;
    line-height: 0.4rem;
    color: @theme-color;
    border-left: none;
    background-color: white;
    &:first-child {
      border-left: 1px solid #898989;
    }
  }
  .isSelected {
    background-color: @theme-color;
    color: white;
  }
}
</style>
