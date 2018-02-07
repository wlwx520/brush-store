<template>
  <!--准备联系我们-->
  <div class="home-contact">
    <div class="main-inner">
      <div class="contact-content">
        <el-row>
          <el-col :span="16">
            <h2>{{readyContact}}</h2>
            <p>{{readyRegister}}</p>
          </el-col>
          <el-col :span="8">
            <el-row >
              <el-col :span="12">
                <button>{{apply}}</button>
              </el-col>
              <el-col :span="12">
                <button>{{contactus}}</button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "greetingWords",
    props: {
      readyContact: {
        type: String,
      },
      readyRegister: {
        type: String,
      },
      apply: {
        type: String,
      },
      contactus: {
        type: String,
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .home-contact {
    width: 100%;
    height: auto;
    .contact-content {
      padding: 116px 0;
      h2 {
        color: #fefefe;
        font-size: 28px;
        text-align: left;
        line-height: 46px;
      }
      p {
        font-size: 14px;
        color: #c9c9c9;
        text-align: left;
      }
      button {
        margin: 12px auto 0;
        background: transparent;
        border: 1px solid #dbdbdb;
        font-size: 14px;
        color: #dbdbdb;
        padding: 12px 46px;
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
  }
</style>
