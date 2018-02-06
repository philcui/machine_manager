<template>
  <div class="bottomBtns">
    <a class="btn" href="/m">
      <img src="../assets/home-icon.png" alt="">
      <span>首页</span>
    </a>
    <div class="btn btn-pub" @click="clickpub">
      <img src="../assets/pub-icon.png" alt="">
      <span>发布</span>
    </div>
    <a class="btn" href="/m">
      <img src="../assets/my-icon.png" alt="">
      <span>店铺</span>
    </a>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    clickpub(){
      this.$emit('on-pubclick')
    }
  },
  components:{

  }
};
</script>

<style lang='less' scoped>
	.bottomBtns {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: @theme-color;
		.btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
			img {
				width: 0.32rem;
				margin-bottom: 2px;
			}
			span {
				font-size: 0.1rem;
				line-height: 1em;
			}
		}
		.btn-pub {
			margin-top: -0.34rem;
			img {
				width: 0.7rem;
			}
		}
	}
</style>
