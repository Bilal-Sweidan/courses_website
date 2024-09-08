<template>
    <section class="main-section">
        <form action="" method="dialog" @submit='sendData'>
            <input type="file" name="" id="photo">
            <button type="submit">send</button>
        </form>
    </section>
</template>
<script>
import axios from 'axios'
export default{
    name : 'SettingComponent',
    data: function(){
        return{
            
        }
    },
    methods:{
        sendData(){
            let formData = new FormData()
            let photo = document.querySelector('#photo').files
            formData.append('photo' , photo[0])
            axios.post('http://localhost:8081/student/setting',formData)
            .then(res => {
                if(res.data){
                    this.$router.push({ path : '/student'})
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .main-section{
        position: absolute;
        width: 100%;
        height: calc(100% - 70px);
        /* background-color: red; */
        top: 70px;
        padding: 20px 20%;
    }
</style>