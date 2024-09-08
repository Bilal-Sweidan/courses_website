<template>
  <LoginView/>
  <!-- <router-view /> -->
</template>

<script>
// import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
export default {
  name: "App", 
  components: {
    // HomeView,
    LoginView
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100vh;
}
</style>


