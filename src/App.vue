<template>
<div class="app">
  <div class="header">
  <header-bar></header-bar>
  </div>
  <div class="page">
    <router-view></router-view>
    <div class="help-text">
      © 2018    
    </div>
  </div>
</div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
export default {
  components: {
    HeaderBar
  },
  name: 'app'
}
</script>

<style>
*{
  box-sizing: border-box;
}
html {
    position: relative;
    min-height: 100%;
}
body {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0 0 60px!important;
}
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header {
  border-bottom: 1px solid #222;
  background-color: #222;
  color: #fff;
  width: 100%;
  padding: 30px 50px;
}

.page {
  width: 100%;  
}

.help-text {       
    position:absolute; 
    bottom: 0;
    height: 50px;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    border-top: 1px solid #222;
    background-color: #222;
    color: #fff;
}
</style>
