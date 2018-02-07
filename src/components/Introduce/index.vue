<template>
  <div class="intro-container">
    <el-row :gutter="40">
      <el-col :span="8">
        <img :src="introPic" alt="产品介绍图片">
      </el-col>
      <el-col :span="16">
        <h4>{{introTitle}}</h4>
        <span></span>
        <p>{{introText}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "index",
    props: {
      introPic: {
        type: String
      },
      introTitle: {
        type: String
      },
      introText: {
        type: String
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .intro-container {
    & img {
      max-width: 100%;
      padding: 12px;
      border: 1px solid #e7e7e7;
    }
    & span {
      width: 78px;
      height: 2px;
      background: #f27e7e;
      display: inline-block;
      margin: 16px 0 36px;
    }
    & h4 {
      color: #464646;
      font-size: 20px;
      line-height: 28px;
    }
    & p {
      color: #666;
      font-size: 14px;
      line-height: 24px;
      text-indent: 2em;
      text-align: justify;
    }
  }
</style>
