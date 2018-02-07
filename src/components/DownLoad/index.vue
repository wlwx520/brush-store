<template>
  <button>{{name}}</button>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "index",
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  button {
    background: transparent;
    border: 1px solid #a0a0a0;
    font-size: 14px;
    color: #eaeaea;
    width: 100%;
    padding: 10px 30px;
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
</style>
