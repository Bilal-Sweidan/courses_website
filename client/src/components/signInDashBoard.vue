<template>
  <section id="logInWindow">
    <div id="logInImg">

    </div>
    <div id="signInDashBoard">
      <div id="formDiv">
        <div>
          <h1>log in</h1>
          <p>welcome back we van log in now.</p>
        </div>
        <form action="" method="dialog" @submit="login">
          <nav>
            <div>
              <label for="">Username</label><br>
              <input id="accountUsername" type="text" v-model="loginData.username" required>
            </div>
          </nav>
          <label for="">Password</label><br>
          <input id="accountPassword" type="password" v-model="loginData.password" required><br>
          <router-link to="/forgetPassword" class="forgetPassword-text">forget password ?</router-link>
          <input id="submitAccount" class="submitButton" type="submit" value="Log In">
        </form>
        <div class="auth2">
          <p class="or">or</p>
          <hr>
          <div class="login-google auth2-button">
            <div>
              <img src="../assets/google.png" alt="">
            </div>
            <p>
              login width google account
            </p>
          </div>
          <div class="login-facebook auth2-button">
            <div>
              <img src="../assets/facebook.png" alt="">
            </div>
            <p>
              login width facebook account
            </p>
          </div>
        </div>
        <p id="haveNoAccount">have no account ? <router-link to="/login">create account</router-link></p>
      </div>

    </div>
  </section>
</template>

<script>
const axios = require('axios');
// axios.defaults.withCredentials = true;
export default {
  name: "signInDashBoard",
  data: function () {
    return {
      loginData: {
        username: '',
        password: '',
      }
    }
  },
  mounted() {
    this.checkAuthentication()
  },
  methods: {
    login: function () {
      axios.post('http://localhost:8081/signIn', this.loginData,
        {
          withCredentials: true
        })
        .then((res) => {
          return res.data
        })
        .then((res) => {
          console.log(res)
          if (res.role === 'Admin') {
            this.$router.push({ path: '/Admin/dashboard/AllInfo' })
          } else if (res.role === 'Teacher') {
            this.$router.push({ path: '/Teacher/news' })
          } else if (res.role === 'Student') {
            this.$router.push({ path: `/Student` })
          }
          localStorage.role = res.role
        })
    },
    checkAuthentication() {
      if (localStorage.role != undefined) {
        this.$router.push({ path: `/${localStorage.role}` })
      }
    }
  },
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#logInWindow {
  display: flex;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#logInWindow #logInImg {
  background-image: url('../assets/logInImg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50%;
  background-position: center;
}

#logInDashBoard,
#signInDashBoard,
#forgetPassword {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: shifting;
  animation-duration: 1s;
  animation-timing-function: linear;
}


#formDiv {
  width: 50%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#formDiv nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

#logInDashBoard #formDiv nav div {
  width: 48%;
}

#formDiv nav div {
  width: 100%;
}

#formDiv form input:not(.submitButton) {
  width: 100%;
  height: 35px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: #eee;
  padding-left: 10px;
  margin: 6px 0 15px 0;

}

#formDiv form input:not(.submitButton):focus {
  animation-name: focus;
  animation-duration: 1s;
  animation-timing-function: step-start;
  animation-iteration-count: infinite;
}

#formDiv form .submitButton {
  width: 100%;
  height: 35px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: #dc6666;
  padding-left: 10px;
  margin: 15px 0;
  font-weight: bold;
  font-size: 20px;
  color: white;
  transition-duration: .5s;
}

.submitButton:hover {
  box-shadow: 1px 1px 5px #ba4646;
  cursor: pointer;
}

.forgetPassword-text {
  text-align: left;
  text-decoration: none;
  font-size: 15px;
  text-transform: capitalize;
}

#haveAccount,
#haveNoAccount {
  text-transform: capitalize;
  margin-top: 20px;
  text-align: center;
}

#formDiv form label {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
}

#formDiv h1 {
  font-family: title;
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  text-transform: capitalize;

}

#haveAccount a,
#haveNoAccount a {
  color: blue;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
}

/* this page only */
#signInDashBoard .auth2 {
  position: relative;
  margin-top: 20px;
  display: block;
}

#signInDashBoard .auth2 .or {
  position: absolute;
  background-color: white;
  font-size: 15px;
  text-transform: uppercase;
  top: -10px;
  left: 48%;
  user-select: none;
}

#signInDashBoard .auth2 .auth2-button {
  width: 80%;
  height: 50px;
  margin-top: 20px;
  margin-left: 10%;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: capitalize;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 90%;
  transition-duration: 1s;
}

#signInDashBoard .auth2 .auth2-button:hover {
  transform: scale(1.05);
}

#signInDashBoard .auth2 .auth2-button div {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

#signInDashBoard .auth2 .auth2-button div img {
  width: 70%;
}

#signInDashBoard .auth2 .login-facebook {
  border: 2px solid blue;
}

#signInDashBoard .auth2 .login-google {
  border: 2px solid red;
}






@keyframes focus {
  to {
    border-right: 10px solid #dc6666;
    background-color: #d1d1d19a;
  }
}

@keyframes shifting {
  from {
    opacity: 0;
    margin-left: -300px;
  }
}

@keyframes detailsShifting {
  from {
    width: 0;
    opacity: 0;
  }

}</style>