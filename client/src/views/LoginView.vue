<template>
  <router-view />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#logInWindow {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 35% auto;
}

#logInWindow #logInImg {
  background-image: url('../assets/logInImg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
  
  
  