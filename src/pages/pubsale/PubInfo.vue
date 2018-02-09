<template>
  <div class="pubInfo">
    <!-- <div class="hintHead">
      <p>暂时只提供二手挖掘机买卖交流</p>
    </div> -->
    <group gutter='0'>
      <div class="filterItem">
        <x-input :title="redDot + '设备类型'" disabled v-model="fullName" text-align='right' placeholder="请选择"></x-input>
        <div v-transfer-dom>
          <popup v-model="showBrandType" position="right" width="70%">
            <div class="selectPage" @click="changeShowBrandName">
              <div class="me1">
                <img src="./img/waji.png" alt="">
                <div class="btn">
                  卖挖机
                </div>
              </div>
              <div class="me2">
                <img src="./img/chanche.png" alt="">
                <div class="btn">
                  卖铲车
                </div>
              </div>
            </div>
          </popup>
        </div>
        <div v-transfer-dom>
          <popup v-model="showBrandName" position="right" width="100%">
            <div class="list-wrap">
              <div class="left-wrap">
                <div v-for="(brand,i) in macTypeData" :key="i" class="item" :class="{'selected': brandNameIndex == i}" @click="selectBrand(brand,i)">{{brand.brand}}</div>
              </div>
              <div class="right-wrap">
                <div v-for="(model,j) in modelData" :key="j" class="item" :class="{'title':model.is_regular==1}" @click="selectModel(model,j)">{{model.model}}</div>
              </div>
            </div>
          </popup>
        </div>
      </div>
      <div @click="changeShowBrandType" class="fake"></div>
      <div @click="changeShowDate" class="filterItem mycell">
        <x-input placeholder="例如2010" :title="redDot + '出厂时间'" v-model="date" text-align='right' :style="{'padding':0}">
          <span slot="right" type="primary" class="unit">/年</span>
        </x-input>
        <div v-transfer-dom>
          <popup v-model="showDate" position="right" width="70%">
            <div class="filter-wrap">
              <h2><img src="../../assets/back-icon.png" />出厂时间</h2>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedDateIndex==index }" v-for="(item, index) in dateData" :key="index" @click="selectDate(item,index)">{{item}}</div>
                </div>
              </div>
              <div class="btns">
                <div class="btn-reset" @click="resetDateFilter">重 置</div>
                <!-- <div class="btn-commit" @click="commitDateFilter">提 交</div> -->
              </div>
            </div>
          </popup>
        </div>
      </div>
      <x-input placeholder="请填写" :title="redDot + '价格'" v-model="price" text-align='right'>
        <span slot="right" type="primary" class="unit">/万</span>
      </x-input>
      <x-address
        :title="redDot + '设备地点'" v-model="addVal"
        :list="addressData" placeholder="请选择" hide-district>
      </x-address>
    </group>
    <group gutter='0.2rem'>
      <x-input placeholder="请填写" :title="redDot + '联系电话'" v-model="phone" text-align='right'></x-input>
      <div class="mycell">
        <p>详细介绍</p>
        <div class="summary">
          <textarea name="" id="" cols="30" rows="10" v-model="description"
          placeholder="请填写出厂时间使用时长等更多介绍（100字以内）"></textarea>
        </div>
      </div>
      <div class="mycell" :style="{'border':'none'}">
        <p><span style='color:red;'>*</span>设备主图<span class="smdesc">（请上传你最想让买家看到的设备整体外观图片，限1张）</span></p>
        <div class="summary" style="border:none;">
          <img :src="thumb" alt="" class="prev">
          <label class="takephoto" for="photo-head"></label>
          <input name="image" type="file" @change="fileHeadChange" accept="image/*" id="photo-head" class="upload-head">
        </div>
      </div>
      <div class="mycell" :style="{'border':'none'}">
        <p><span style='color:red;'>*</span>设备详情<span class="smdesc">（请如实上传照片，为你加分，最多9张）</span></p>
        <div class="summary" style="border:none;">
          <div class="img-box" id="imgboxid">
            <label v-for="(item,i) in imgs" class="wrap" :for="'fake-upload-'+i">
              <img :src="item" alt="" />
              <input name="image" type="file" accept="image/*" class="fake-upload" :id="'fake-upload-'+i" @change="editImg(i)" />
            </label> 
          </div>
          <!-- <div class="upload-muti" @click="uploadMuti"></div> -->
          <label class="takephoto" for="photo-info"></label>
          <input name="image" type="file" @change="fileInfoChange" accept="image/*" id="photo-info" multiple="multiple" class="upload-info">
        </div>
      </div>
    </group>
    <div @click.prevent="submitPubInfo" class="submit">提交</div>
  </div>
</template>

<script>
import {
  TransferDom,
  Popup,
  XAddress,
  // ChinaAddressV4Data,
  PopupPicker,
  Selector,
  Group,
  XInput,
  Cell,
  Checker,
  CheckerItem
} from "vux"
import macTypeData from "@/data/car_type.json"
import chancheTypeData from "@/data/chanche_model_type.json"
import wajiTypeData from "@/data/waji_model_type.json"
import provinceData from "@/data/prov.json"
//阉割版地图
import ChinaAddressV4Data from "@/data/china_data.json"
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data() {
    return {
      showBrandName: false,
      showBrandType: false,
      showDate: false,
      selectedDateIndex: -1,
      addressData: ChinaAddressV4Data,
      addVal: [],
      dateData: ['2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'],
      date: '',
      price: '',
      brandNameIndex: 0,
      brandName: '',
      fullName: '',
      thumb: '',
      imgs: [],
      macTypeData: wajiTypeData,
      modelData: wajiTypeData[0].list,
      macTypeVal: '挖机',
      modelVal: '',
      phone: "",
      description: "",
      redDot: "<span style='color:red;'>*</span>",
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XAddress,
    PopupPicker,
    Selector,
    Group,
    XInput,
    Checker,
    Cell,
    CheckerItem
  },
  methods: {
    changeShowBrandName(ev) {
      //_className = ev.srcElement.className
      let _className = ev.target.parentElement.className
      console.log(ev)
      if(_className == 'me1'){
        this.macTypeData = wajiTypeData
        this.macTypeVal='挖机'
      }else if(_className == 'me2'){
        this.macTypeData = chancheTypeData
        this.macTypeVal='铲车'
      }
      this.showBrandName = !this.showBrandName
    },
    changeShowBrandType() {
      this.showBrandType = !this.showBrandType
    },
    changeShowDate() {
      this.showDate = !this.showDate
    },
    selectDate(item,index){
      this.selectedDateIndex = index
      this.commitDateFilter()
    },
    commitDateFilter(){
      this.date = this.dateData[this.selectedDateIndex]
      this.changeShowDate()
    },
    resetDateFilter(){
      this.selectedDateIndex = -1
      this.commitDateFilter()
    },
    selectBrand(brand,i){
      this.brandNameIndex = i
      this.modelData = this.macTypeData[i].list
      this.brandName = brand.brand
    },
    selectModel(model,j){
      this.brandName = this.brandName || this.macTypeData[0]['brand']
      this.modelVal = model.model
      this.fullName = this.brandName+this.modelVal
      this.showBrandName = !this.showBrandName
      this.changeShowBrandType()
    },
    getErrorInfo(key) {
      var infoMap = {
        "001": "请选择设备类型",
        "002": "请选择工作地点",
        "003": "请选择操作方向",
        "004": "请选择吃住方式",
        "005": "请选择月薪",
        "006": "请填写联系电话",
        "007": "请填写正确的电话格式",
        "008": "请填写姓名",
        "010": "请填写详情",

      };
      return infoMap[key];
    },
    validatePubInfo() {
      if (this.macTypeVal == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("001"),
          type: "text"
        });
        return false;
      }
      if (this.addVal == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("002"),
          type: "text"
        });
        return false;
      }
      if (this.phone == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("006"),
          type: "text"
        });
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$vux.toast.show({
          text: this.getErrorInfo("007"),
          type: "text"
        });
        return false;
      }
      if (this.description == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("010"),
          type: "text"
        });
        return false;
      }
      return true;
    },
    submitPubInfo() {
      if (this.validatePubInfo()) {
        //前端校验通过
        if(getUrlKey("id") > 0){
          //修改提交
          let id = getUrlKey("id")
          this.axios.post("/api/used-m/update-sell?id="+id, this.getFormInfo())
          .then((res) => {
            //todo 后端返回错误需处理
            console.log(res)
            this.$vux.toast.show({
              type: "success",
              text: "提交成功"
            })
            setTimeout(() => {
              window.location.href = "../saledetail/index.html?id=" + id
            }, 1000)
            //window.location.href = "../result/index.html?restype=" + JSON.stringify(this.getResInfo(res))
          });
        }else{
          //新增提交
          this.axios.post("/api/used-m/add-sell", this.getFormInfo())
          .then((res) => {
            //todo 后端返回错误需处理
            console.log(res)
            setTimeout(() => {
              window.location.href = "../saledetail/index.html?id=" + res.data.data.id
            }, 1000)
          });
        }
      } else {
        //前端校验不通过
      }
    },
    getFormInfo(){
      console.log(this.addVal)
      let data = {
        brand: this.brandName,
        model: this.modelVal,
        type: this.macTypeVal,
        address_id: this.addVal[1],
        mobile: this.phone,
        price: this.price,
        description: this.description,
        production_date: this.date,
        thumb: this.thumb,
        imgs: this.imgs,
      }
      // for(let i=0;i<this.imgs.length;i++){
      //   data['imgs[]'] = this.imgs[i]
      // }
      return this.qs.stringify(data)
    },
    getResInfo(res){
      return {
          content1: "发布招聘信息成功",
          content2: "我们会尽审核",
          button1: "查看发布信息",
          button2: "返回首页",
          url1: "../workdetail/index.html?id=" + res.data.data.id,
          url2: "../index.html",
          title: "发布招聘信息成功"
      }
    },
    getHisInfo(){
      this.axios.get("/api/used-m/sell-detail?id=" + getUrlKey('id')).then((res) => {
        console.log(res)
        this.setHisInfo(res.data.data)
      })      
    },
    getItemValue(keys, list){
      if(!keys){
        return []
      }
      keys = keys.split(' ')
      return keys.map((x, index) => {
        return list.find((item, index) => {
          return item.key == x
        }).value
      })
    },
    setHisInfo(data){
      this.axios.get("/api/used-m/query-sell-mobile?item_id=" + getUrlKey('id')).then((res) => {
        this.phone = res.data.data.mobile
      })      
      Object.keys(data).forEach((item, index) => {
        if(data[item]){
          data[item] = data[item].toString()
        }
      })
      console.log(data)
      this.brandName = data.brand
      this.modelVal = data.model
      this.fullName = data.brand+data.model
      this.date = data.production_date
      this.description = data.description
      this.price = data.price
      this.addVal = ['0',data.address_id]
      //this.addVal = data.address
      this.thumb = data.thumb
      this.imgs = data.imgs.split(',')
    },
    fileHeadChange(e){
      let file = document.querySelector(".upload-head").files[0]
      let reader = new FileReader()
      reader.onload = function(e){
        document.querySelector(".prev").src = e.target.result
      }
      let formdata = new FormData();
      formdata.append('imgs[]',file);
      this.axios.post("/api/used-m/upload-img",formdata,{headers: {'Content-Type': 'multipart/form-data'}})
      .then((res) => {
        if(res.data.code == 200){
          this.thumb = res.data.data[0]
        } 
      })
      reader.readAsDataURL(file)  
    },
    fileInfoChange(){
      let files = document.querySelector(".upload-info").files
      let _this = this
      let formdata = new FormData();
      for(let i=0;i<files.length;i++){
        var file = files[i]
        formdata.append('imgs[]',file);
      }
      if(files.length+_this.imgs.length>9){
        _this.$vux.toast.show({
          text: '最多上传9张',
          type: "text"
        });
        return false
      }else{
        this.axios.post("/api/used-m/upload-img",formdata,{headers: {'Content-Type': 'multipart/form-data'}})
        .then((res) => {
          if(res.data.code == 200){
            this.imgs = this.imgs.concat(res.data.data)
          } 
        })
      }
    },
    editImg(index){
      let id = '#fake-upload-'+index
      let file = document.querySelector(id).files[0]
      let reader = new FileReader()
      reader.onload = function(e){
        document.querySelector(id).previousElementSibling.src = e.target.result
      }
      let formdata = new FormData();
      formdata.append('imgs[]',file);
      this.axios.post("/api/used-m/upload-img",formdata,{headers: {'Content-Type': 'multipart/form-data'}})
      .then((res) => {
        if(res.data.code == 200){
          this.imgs.splice(index,1,res.data.data[0])
        } 
      })
      reader.readAsDataURL(file)  
    },
    getAddList(target){
      let res = []
      res.push(target.substring(0, 2) + "0000")
      res.push(target.substring(0, 4) + "00")
      //res.push(target)
      return res
    }
  },
  computed: {
    
  },
  mounted(){
    //修改发布的招聘信息
    if(getUrlKey("id") > 0){
      //编辑已发布的信息
      this.getHisInfo();
    }else{
      //新发布
      this.axios.get("/api/user/my")
      .then((res) => {
        //这里存在大量赋值操作，后续可以和后台数据字段做整理
        console.log(res.data.data)
        let data  = res.data.data
        this.phone = data.mobile
      })
      // this.axios.post("/api/default/guess-address")
      // .then((res) => {
      //   //todo 这里设计有矛盾，到底以用户已经填写的还是当前定位的为准
      //   console.log(res)
      //   this.addVal = this.getAddList(res.data.data.id.toString())
      // })
    }
  }
};
</script>

<style lang='less' scoped>
.unit {
  color: #000;
}
.pubInfo {
  height: 100%;
  background-color: #eeeeee;
  .fake {
    width: 100%;
    height: 0.92rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  .hintHead {
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    p {
      text-align: center;
      color: @theme-color;
      font-size: 0.25rem;
    }
  }
  .skillcell {
    padding-right: 0 !important;
  }
  .addTip {
    font-size: 0.2rem;
    color: #626262;
    a {
      color: @theme-color;
    }
  }
  .mycell {
    margin-left: 0.28rem;
    padding-right: 0.28rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    border-top: 0.5px solid @divid-color;
  }
  .nextTip {
    font-size: 0.24rem;
    text-align: center;
  }
  .checker {
    margin-left: 0.28rem;
  }
  .summary {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    padding: 0.15rem;
    border: 1px solid @divid-color;
    textarea {
      width: 100%;
      height: 1.6rem;
      resize: none;
      padding: 0;
      margin: 0;
      border: none;
      font-size: 0.32rem;
    }
    .img-box {
      font-size: 0;
      .wrap {
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        position: relative;
        >img {
          //display: block;
          width: 1.8rem;
          height: 1.8rem;
        }
        .fake-upload {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9
        }
      }
    }
    .prev {
      //display: block;
      width: 1.8rem;
      height: 1.8rem;
    }
    .takephoto {
      display: block;
      width: 2rem;
      height: 2rem;
      border: 1px dotted #999;
      background: url('./img/photo.png') no-repeat center center;
      background-size: 0.53rem 0.43rem;
    }
    input {
      position: absolute;
      clip: rect(0 0 0 0);
    }
    .upload-muti {
      width: 2rem;
      height: 2rem;
      border: 1px dotted #999;
      background: url('./img/photo.png') no-repeat center center;
      background-size: 0.53rem 0.43rem;
    }
  }
  .submit {
    display: block;
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: @theme-color;
    color: white;
    text-align: center;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }
}
.checker_content {
  padding-left: 0.22rem;
  line-height: 0.7rem;
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
.filter-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  >h2 {
    >img {
      width: 0.3rem;
      margin-right: 0.1rem;
    }
    display: flex;
    align-items: center;
    padding: 0.2rem;
    width: 100%;
    line-height: 0.9rem;
    border-bottom: 1px solid @divid-color;
    font-size: 1em;
    font-weight: 300;
    letter-spacing: 0.8em;
    vertical-align: middle;
  }
  .options {
    .list {
      font-size: 0;
      overflow: scroll;
      padding: 0.1rem;
      .item {
        display: inline-block;
        width: 1.3rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: #eee;
        font-size: 0.2rem;
        margin: 0.06rem;
        border-radius: 4px;
      }
      .selected {
        background-color: @second-color;
        color: #fff;
      }
    }
  }
  .btns {
    width: 100%;
    height: 0.76rem;
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    font-size: 0;
    >div {
      display: block;
      width: 80%;
      line-height: 0.76rem;
      text-align: center;
      font-size: 0.32rem;
      font-weight: 300;
      color: #fff;
      margin: 0 auto;
      border-radius: 0.2rem;
    }
    .btn-reset {
      background-color: @theme-color;
    }
    .btn-commit {
      background-color: @second-color;
    }
  }
}
.selectPage{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 9999;
  .me1, .me2{
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 4.45rem;
    margin: 0 auto;
    img{
      width: 1.75rem;
    }
    .btn{
      display: block;
      height: 0.84rem;
      width: 3.46rem;
      line-height: 0.84rem;
      text-align: center;
      background-color: #b48a58;
      color: white;
      font-size: 0.32rem;
      border-radius: 0.05rem;
      box-shadow: 0 0.05rem 0 #6e6e6e;
      margin-top: 0.34rem;
    }
  }
  .me1{
    border-bottom: 1px solid #707070;
  }
}
.list-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.28rem;
  .left-wrap {
    width: 30%;
    height: 100%;
    overflow: scroll;
    background-color: #f6f6f8;
    float: left;
  }
  .right-wrap {
    width: 70%;
    height: 100%;
    overflow: scroll;
    background-color: #fff;
    float: left;
    .title {
      font-weight: 800;
      color: @theme-color;
    }
  }
  .item {
    padding-left: 0.4rem;
    box-sizing: border-box;
    line-height: 0.8rem;
    border-bottom: 1px solid @divid-color;
  }
  .selected {
    background-color: #fff;
    color: @theme-color;
  }
}
.smdesc {
  font-size: 0.186rem;
  color: #434343;
}
</style>
