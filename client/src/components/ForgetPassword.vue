<template>
    <section id="logInWindow">
      <div id="logInImg">
  
    </div>
    <div id="forgetPassword">
        <div id="formDiv">
            <h1>forget password</h1>
            <p>we will send to your Email a validation code so please enter your <span> username </span></p>
            <form action="" method="dialog" @submit="ForgetPassword()">
                <nav>
                    <div>
                        <label for="">Username</label><br>
                        <input id="accountUsername" type="text" v-model="username" autofocus required>
                    </div>
                </nav>
                <input id="submitCode" class="submitButton" type="submit" value="Submit" >
            </form>
        </div>
    </div>
    </section>
</template>

<script>
export default {
    name: 'ForgetPassword',
    data:function(){
        return{
            username: ''
        }
    },
    methods:{
        ForgetPassword:function (){
            fetch("http://localhost:8081/ForgetPassword",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({ username : this.username})
            })
            .then(res => res.json())
            .then( res => {
                console.log(res)
                if(res){
                    this.$router.push({name : 'validationCode'})
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
p{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-transform: capitalize;
    word-break: break-all;
    margin-bottom: 10px;
    span{
        color: red;
    }
}
</style>