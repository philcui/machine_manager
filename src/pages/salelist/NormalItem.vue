<template>
  <div class="wrap">
    <a class="info" :href="gethref()">
      <div class="img" :style="{'backgroundImage':'url('+normalObj.thumb+')'}">
        <p>{{normalObj.brand+normalObj.model}}</p>
      </div>
      <div class="info1">
        <strong>{{normalObj.price}}万</strong>{{normalObj.production_date}}年|{{normalObj.address}}
      </div>
      <div class="info2">
        {{normalObj.description}}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data(){
    return {
      specialList : [],
    }
  },
  props:{
    normalObj: Object
  },
  components:{
    
  },
  methods: {
    gethref(){
      return "../saledetail/index.html?id=" + this.normalObj.id
    },
  },
  mounted(){
    
  }
}
</script>

<style lang='less' scoped>
  .wrap{
    float: left;
    width: 2.9rem;
    margin: 0.1rem;
    font-size: 0.24rem;
    overflow: hidden;
    border: 1px solid @divid-color;
    &:nth-child(2) {
      margin-top: 1.2rem;
    }
    &:nth-child(2n+3) {
      margin-top: -1rem;
    }
    .info {
      display: block;
      width: 100%;
      background-color: #fff;
      .img {
        width: 100%;
        height: 3.6rem;
        background: url() no-repeat center center;
        background-size: cover;
        position: relative;
        >p {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 0.5rem;
          background-color: rgba(0,0,0,0.6);
          color: #fff;
          padding: 0.1rem;
          box-sizing: border-box;
        }
      }
      .info1 {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #f4f4f4;
        color: #000;
        font-size: 0.22rem;
        text-align: center;
        >strong {
          color: #920016;
          margin-right: 0.04rem;
        }
      }
      .info2 {
        width: 100%;
        height: 0.7rem;
        padding: 0.05rem;
        box-sizing: border-box;
        background-color: #fafafa;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #8e8e8e;
        font-size: 0.22rem;
        line-height: 1.4;
      }
    }
  }
</style>
