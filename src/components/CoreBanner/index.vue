<template>
  <div class="smart_banner">
    <el-row>
      <el-col :span="24">
        <img :src="banner_pic" alt="核心技术banner图">
      </el-col>
    </el-row>
    <div class="banner_advertise">
      <span></span>
      <h6>{{mediumTitle}}</h6>
      <h1>{{bannerBigTitle}}</h1>
      <p>{{smallTitle}}</p>
      <button>{{btnInfor}}</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "index",
    props:{
      banner_pic:{
        type: String
      },
      mediumTitle:{
        type: String
      },
      bannerBigTitle:{
        type: String
      },
      smallTitle:{
        type: String
      },
      btnInfor:{
        type: String
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .smart_banner {
    position: relative;
    height: auto;
    img {
      max-width: 100%;
      min-width: 1024px;
      vertical-align: bottom;
      display: flex;
    }
    .banner_advertise {
      position: absolute;
      top: 120px;
      right: 24%;
      & span {
        width: 124px;
        height: 1px;
        background: #c7c7c7;
        display: inline-block;
        margin-bottom: 40px;
      }
      & h1 {
        color: #fff;
        text-transform: uppercase;
        font-size: 70px;
        letter-spacing: 6px;
        line-height: 0;
        font-weight: normal;
      }
      & h6 {
        color: #b6b6b6;
        font-size: 28px;
        font-weight: lighter;
        letter-spacing: 10px;
        line-height: 20px;
      }
      & p {
        color: #9a9a9a;
        font-size: 20px;
        font-weight: lighter;
        line-height: 44px;
      }
      & button {
        padding: 10px 36px;
        border: 1px solid #c0c0c0;
        border-radius: 4px;
        margin-top: 35px;
        display: block;
        background: none;
        color: #c0c0c0;
        font-size: 12px;
        outline: none;
        &:hover {
          background: #f26060;
          color: #fff;
          border: 1px solid #f26060;
          transition: all 0.4s;
          cursor: pointer;
        }
      }
    }
  }
</style>
