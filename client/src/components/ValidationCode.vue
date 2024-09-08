<template>
    <section id="logInWindow">
      <div id="logInImg">
  
      </div>
      <div id="forgetPassword">
          <div id="formDiv">
              <h1>Validation Code</h1>
              <p>we will sent to your Email a validation code so please enter your <span> validation code </span></p>
              <form action="" method="dialog" @submit="checkValidationCode()">
                  <nav>
                      <div>
                          <label for="">Validation code</label><br>
                          <input id="validationCode" type="text" v-model="validationCode" autofocus required>
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
    name: 'validationCode',
    data:function(){
        return{
            validationCode: ''
        }
    },
    methods:{
        checkValidationCode:function (){
            fetch("http://localhost:8081/validationCode",{
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({ validationCode : this.validationCode})
            })
            .then(res => res.json())
            .then( res => {
                console.log(res)
                if(res){
                    this.$router.push({name : 'home'})
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