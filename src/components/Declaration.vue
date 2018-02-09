<template>
  <div class="declaration" v-show="decShow">
    <div class="wrap">
    	<div class="top">
    		免责声明<img src="../assets/declaration.png" />
    	</div>
    	<div class="info">
    		<p>工机管家二手机是为用户提供工程机械设备交易信息分享、传播及获取的平台，店铺的所有行为并不因为实名认证或车商认证成功而具备真实性与合法性，卖家收取定金、保证金等都属于个人行为，与平台无关，敬请留意甄别</p>
    		<div class="tip" @click="handleTip" v-show="!noDecla"><span :class="{'selected':tip}"></span>不再提示</div>
    		<div class="btn" @click="handleHide">我知道了</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		decShow: {
      type: Boolean
    },
    noDecla: {
      type: Boolean
    },
    tip: {
      type: Boolean
    },
	},
  data(){
    return {
      
    }
  },
  methods:{
    handleHide(){
      this.$emit('on-hideclick')
    },
    handleTip(){
    	this.$emit('on-tipclick')
    }
  },
  components:{
     
  }
};
</script>

<style lang='less' scoped>
	.declaration {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		position: fixed;
		top: 0;
		left: 0;
		.wrap {
			width: 5.1rem;
			margin: 1.5rem auto 0;
			background-color: #fff;
			.top {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 2.3rem;
				background-color: @theme-color;
				color: #fff;
				font-size: 0.6rem;
				>img {
					width: 0.84rem;
					margin-left: 0.3rem;
				}
			}
			.info {
				padding: 0.35rem;
				>p {
					font-size: 0.26rem;
					line-height: 1.5;
					margin-bottom: 0.35rem;
				}
				.tip {
					color: #999;
					font-size: 0.2rem;
					display: flex;
					align-items: center;
					margin-bottom: 0.35rem;
					>span {
						display: inline-block;
						width: 0.24rem;
						height: 0.24rem;
						border-radius: 50%;
						border: 1px solid #999;
						margin-right: 0.1rem;
					}
					.selected {
						border-color: @theme-color;
						background-color: @theme-color;
					}
				}
				.btn {
					width: 4.2rem;
					line-height: 0.72rem;
					text-align: center;
					color: @theme-color;
					border: 1px solid  @theme-color;
					margin: 0 auto;
				}
			}
		}
	}
</style>
