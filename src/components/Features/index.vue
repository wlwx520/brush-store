<template>
  <div class="features-container">
    <el-row :gutter="30">
      <el-col :span="6">
        <img :src="pic" alt="功能列表图片">
      </el-col>
      <el-col :span="18">
        <h4>{{title}}</h4>
        <span></span>
        <p>{{text}}</p>
        <!--<button>{{experience}}</button>-->
        <button>免费体验</button>
      </el-col>
    </el-row>
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .features-container {
    position: relative;
    width: 100%;
    height: auto;
    padding: 20px;
    background: #fff;
    border: 1px solid #d7d7d7;
    margin-bottom: 20px;
    &:hover {
      -webkit-transform: translate(0px, -5px);
      -moz-transform: translate(0px, -5px);
      -o-transform: translate(0px, -5px);
      -ms-transform: translate(0px, -5px);
      transform: translate(0px, -5px);
      -webkit-box-shadow: 0 5px 10px rgba(67, 72, 84, 0.3);
      box-shadow: 0 5px 10px rgba(67, 72, 84, 0.3);
      transition-duration: 0.4s;
      border: 1px solid #f26060;
    }
    & img {
      max-width: 100%;
      /*&:hover{*/
      /*transform: scale(1.05);*/
      /*transition-duration: 0.4s;*/
      /*overflow: hidden;*/
      /*}*/
    }
    & h4 {
      color: #464646;
      font-size: 20px;
      font-weight: normal;
    }
    & span {
      width: 45px;
      height: 1px;
      background: #f27e7e;
      display: inline-block;
      margin: 10px 0 24px;
    }
    & p {
      font-size: 14px;
      line-height: 24px;
      color: #666;
      text-align: justify;
    }
    & button {
      position: absolute;
      bottom: 0;
      right: 20px;
      background: transparent;
      border: 1px solid #dbdbdb;
      font-size: 14px;
      color: #888;
      padding: 8px 30px;
      border-radius: 10px;
      outline: none;
      box-sizing: border-box;
      &:hover {
        cursor: pointer;
        background: #f26060;
        color: #fff;
        border: 1px solid #f26060;
        transition: all 0.4s;
      }
    }
  }


</style>
