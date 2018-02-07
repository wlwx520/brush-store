<template>
  <div class="features-container">
    <el-row :gutter="30">
      <el-col :span="6">
        <img :src="pic" alt="功能列表图片">
      </el-col>
      <el-col :span="18">
        <div class="lists"></div>
        <h4>{{title}}</h4>
        <span></span>
        <p>{{detail}}</p>
        <div class="usePro">
          <p>{{useProduct}}<b class="toRed">{{productName}}</b></p>
        </div>
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
      detail: {
        type: String
      },
      useProduct: {
        type: String
      },
      productName: {
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
    .lists {
      position: relative;
      width: 100%;
      height: auto;
    }
    & img {
      max-width: 100%;
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
    & .usePro {
      position: absolute;
      bottom: 0;
      font-size: 14px;
      .toRed {
        color: #d55a5a;
        font-weight: normal;
      }
    }
  }


</style>
