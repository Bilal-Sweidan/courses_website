<template>
    <section>
        <form method="dialog" enctype="multipart/form-data" @submit="newTeacher">
            <nav class="teacherImg">
                <p>upload personal photo</p>
                <div id="imgBox">
                    <img :src="personalImg" alt="" id="image">
                </div>
                <label for="fileInput" class="bar fileInputLabal" id=""> 
                    <font-awesome-icon icon="fa-solid fa-pencil" />
                    <input type="file" name="" id="fileInput" accept="image/*" style="display: none;" @change="uploadImg" required>
                </label>
            </nav>
            <input type="text" placeholder="first name" v-model="teacherData.firstName" required>
            <input type="text" placeholder="last name" v-model="teacherData.lastName" required>

            <input type="tel" placeholder="phone number" v-model="teacherData.phoneNumber" required>
            <select name="" id="" v-model="teacherData.gender" required>
                <option value="" disabled selected style="display: none;">gender</option>
                <option value="man">man</option>
                <option value="women">women</option>
                <option value="other">other</option>
            </select>
            <input type="password" name="" id="password" placeholder="enter password" required>
            <input type="password" name="" id="rePassword" placeholder="re-enter password" required>  

            <input type="text" name="" id="address" placeholder="address" v-model="teacherData.address" required>
            <select name="" id="" v-model="teacherData.department" required>
                <option value="" disabled selected style="display: none;">department</option>
                <option :value="category.name" v-for="category in categories" :key="category">{{ category.name }}</option>
            </select>

            <input type="email" name="" id="teacherEmail" placeholder="email" v-model="teacherData.email" required>
            <input type="date" name="" id="" v-model="teacherData.birthDay" required>

            <textarea name="" id="teacherAbout" cols="30" rows="10" placeholder="About" v-model="teacherData.about" required></textarea>

            <input type="submit" value="submit" id="submitButton" >
        </form>
    </section>
</template>
<script>
const axios = require('axios')
export default{
    name: 'AddTeacher',
    data: function(){
        return{
            personalImg: null,
            slectedImg: null,
            categories: '',
            teacherData:{
                firstName: '',
                lastName: '',
                phoneNumber: '',
                gender: '',
                password: '',
                address: '',
                department: '',
                email: '',
                birthDay: '',
                about: '',
                teacherImg: '',               
            }
        }
    },
    mounted(){
        fetch('http://localhost:8081/Admin/teachers/addTeacher')
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            this.categories = res
            console.log(this.categories)
        })

        document.querySelector('#rePassword').addEventListener('change',() => {
            const password = document.querySelector('#password')
            const rePassword = document.querySelector('#rePassword')
            if(password.value === rePassword.value){
                password.style.borderColor = 'green'
                rePassword.style.borderColor = 'green'
                this.teacherData.password = password.value
            }else{
                password.style.borderColor = 'red'
                rePassword.style.borderColor = 'red'
                document.querySelector('#submitButton').disabled = 'false'
            }
        })
    },
    methods:{
        uploadImg(event){
            let fr = new FileReader()
            fr.onload = () => {
                this.personalImg = fr.result
            }
            fr.readAsDataURL(event.target.files[0])
            this.slectedImg = event.target.files[0]
        },
        newTeacher(){
            const formData = new FormData();
            formData.append("file", this.slectedImg);
            formData.append('teacherData',JSON.stringify(this.teacherData))
            axios.post('http://localhost:8081/Admin/teachers/addTeacher', formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                },
            })
            this.teacherData.firstName = ''
            this.teacherData.lastName = ''
            this.teacherData.phoneNumber = ''
            this.teacherData.gender = ''
            this.teacherData.email = ''
            this.teacherData.about = ''
            this.teacherData.address = ''
            this.teacherData.birthDay = ''
            this.teacherData.department = ''
            this.teacherData.password = ''
            document.querySelector('#rePassword').value = ''
        },
    },
}
</script>

<style lang="scss" scoped>
$main-color: #141a28;
section{
    position: absolute;
    width: 95%;
    height: 100%;
    margin: 2% 1%;
    border-radius: 5px;

    form{
        width: 100%;
        margin: 20px;
        color:  black;
        display: grid;
        grid-template-columns: repeat(3,calc((100% / 3) - 10px));
        grid-template-rows: repeat(7,calc((86% / 7) - 5px));
        row-gap: 3px;
        column-gap: 23px;
        p{
            width:  200px;
            text-align: center;
            margin-bottom:  10px;
            text-transform: capitalize;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .teacherImg{
            grid-row: 1 / 4;
            margin: 0 auto;
            #imgBox{
                width: 200px;
                height: 200px;
                border-radius: 50%;
                border:  2px solid white;
                position: relative;
                background-image: url(../assets/user.png);
                background-repeat: no-repeat;
                background-size: cover; 
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            label{
                width: 40px;
                height:  40px;
                position: absolute;
                top: 60px;
                left: 265px;
                background-color: #eee;
                color: black;
                border-radius:  50%;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid black;
            }
            label:hover{
                cursor: pointer;
            }
        }
        *:not(.teacherImg,.teacherImg *){
            height: 45px;
            margin: 20px 0;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0 10px;
            font-size: 1vw;
            text-transform: capitalize;
            outline: none;
            border-bottom: 2px solid blue ;
            border-top: none;
            border-right: none;
            border-left: none;
            outline: none;
            color: white;
            background: $main-color;
            option{
                background-color: #1b2131;
                margin: 10px 0;
            }
        }
        #address{
            grid-column: 1 / 3;
        }
        #teacherEmail{
            grid-column: 1 / 3;
        }
        #teacherAbout{
            grid-column: 1 / 4;
        }
        #submitButton{
            background-color: blue;
            font-size: 1.3vw;
            border-radius: 100% 0% 100% 0% / 45% 65% 35% 55%;
        }
        #submitButton:hover{
            cursor: pointer;
        }

    }
}

</style>