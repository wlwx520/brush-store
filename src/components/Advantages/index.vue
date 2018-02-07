<template>
  <div class="advanlists" @mouseenter="showPic(index)" @mouseleave="showPic(0)">
    <img v-show="active !== index" :src="pic" alt="图标">
    <img v-show="active === index" :src="picActive" alt="图标">
    <h4>{{title}}</h4>
    <p>{{text}}</p>
    <span></span>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "index",
    props: {
      pic: {
        type: String
      },
      title: {
        type: String
      },
      text: {
        type: String
      },
      picActive:{
        type: String
      },
      index:{
        type: Number
      }
    },
    data(){
      return {
        active: 0
      }
    },
    watch:{

    },
    methods:{
      showPic(num){
        this.active= num;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .advanlists {
    & img {
      text-align: center;
      margin: 0 auto;
      display: flex;
    }
    & h4 {
      color: #dcdcdc;
      font-size: 20px;
      text-align: center;
      margin: 24px 0 28px;
    }
    & p {
      font-size: 14px;
      line-height: 24px;
      color: #c3c3c3;
      text-align: center;
    }
    & span{
      width: 0;
      height: 1px;
      background: #f26060;
    }
  }
</style>
