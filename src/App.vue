<template>
  <div id="app">

    <Navbar/>
    <img src="@/assets/logo.png" class="app-logo">
    <keep-alive include="Signup">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>

<style> 
  .app-logo{
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
