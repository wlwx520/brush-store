<template>
  <div class="caseList">
    <img :src="pic" alt="图片列表">
    <h4>{{title}}</h4>
    <span></span>
    <p>{{detail}}</p>
    <div class="application-sence">
      <span></span>
      <p>{{coop}}</p>
    </div>
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
      coop: {
        type: String
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .caseList {
    width: 100%;
    background: #fff;
    border: 1px solid #e1e1e1;
    padding: 10px;
    position: relative;
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
    }
    & h4 {
      font-size: 18px;
      color: #464646;
      margin-top: 16px;
      line-height: 30px;
      text-align: center;
      font-weight: normal;
    }
    & > span {
      width: 22px;
      height: 1px;
      background: #f69a9a;
      display: block;
      margin: 0 auto 20px;
    }
    & > p {
      color: #666;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      margin-bottom: 30px;

    }
    .application-sence {
      & span {
        width: 100%;
        height: 1px;
        background: #e8e8e8;
        display: block;
      }
      & > p {
        text-align: left;
        margin: 10px 0 0;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        padding-left: 4px;
      }
    }
  }
</style>
