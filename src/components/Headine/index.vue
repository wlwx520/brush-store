<template>
    <div class="headine">
       <p>{{smallTitle}}</p>
        <div class="line">
          <span></span>
          <span></span>
        </div>
        <h1>{{preTitle}} <span class="redTitle">{{postfixTitle}}</span></h1>
    </div>
</template>

<script>
  /* eslint-disable */
    export default {
      name: "Headline",
      props:{
        smallTitle:{
          type: String,
        },
        preTitle:{
          type: String,
        },
        postfixTitle:{
          type: String,
        },
      },
      data(){
          return {

          }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .headine{
    width: 380px;
    height: auto;
    margin: 0 auto 42px;
   .line{
     width: 100px;
     margin: 20px auto;
     span{
       display: flex;
       width: 70px;
       height: 1px;
       background: #888;
       &:last-child{
         margin-left: 30px;
         margin-top: 5px ;
       }
     }
   }
    h1{
      font-size: 30px;
      color: #646464;
      text-align: center;
      text-transform: uppercase;
      .redTitle{
        color: #da4f4f;
      }
    }
   p{
     text-align: center;
     font-size: 12px;
     color: #666;
     text-transform: uppercase;
   }
 }

</style>
