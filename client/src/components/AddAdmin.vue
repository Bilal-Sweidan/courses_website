<template>
    <section>
        <form action="" @submit="newAdmin">
            <input type="text" id="firstName" placeholder="first name" v-model="newadminData.firstName">
            <input type="text" id="lastName" placeholder="last name" v-model="newadminData.lastName">
            <nav class="adminImg">
                <div id="imgBox">
                    <img :src="personalImg" alt="" id="image">
                </div>
                <label for="fileInput" class="bar fileInputLabal" id="">
                    <font-awesome-icon icon="fa-solid fa-pencil" />
                    <input type="file" name="" id="fileInput" accept="image/*" style="display: none;" @change="upload"
                        required>
                </label>
                <p>upload personal photo</p>
            </nav>

            <input type="password" name="" id="password" placeholder="enter password" v-model="newadminData.password">
            <input type="password" name="" id="rePassword" placeholder="re-inter password">

            <input type="email" name="" id="" placeholder="email" v-model="newadminData.email">
            <input type="tel" name="" id="" placeholder="phone number" v-model="newadminData.phone">
            <input type="text" name="" id="address" placeholder="address" v-model="newadminData.address">

            <label id="submitLabel" for="submitButton">
                <font-awesome-icon id="buttonIcon" icon="fa-solid fa-file-import" />
                <input type="submit" value="validate" id="submitButton">
            </label>

        </form>
    </section>
</template>
<script>
const axios = require('axios')
export default {
    name: 'AddAdmin',
    data: function(){
        return{
            personalImg: null,
            uploadPhoto: null,
            newadminData:{
                firstName: '',
                lastName: '',
                password: '',
                email: '',
                phone: '',
                address: '',
            }
        }
    },
    methods:{
        upload(event){
            const fr = new FileReader()
            fr.onload = () => {
                this.personalImg = fr.result
            }
            fr.readAsDataURL(event.target.files[0])
            this.uploadPhoto = event.target.files[0]
        },
        newAdmin(){
            const formData = new FormData()
            formData.append('file',this.uploadPhoto)
            formData.append('newAdminData',JSON.stringify(this.newadminData))
            axios.post('http://localhost:8081/Admin/admin/addAdmin',formData,{
                headers:{'Content-Type' : `multipart/form-data; boundary=${formData._boundary}`}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$main-color: #141a28;
section {
    position: absolute;
    width: 98%;
    height: 86%;
    margin: 2% 1%;
    border-radius: 5px;

    form {
        width: 100%;
        margin: 20px;
        color: #eee;
        display: grid;
        grid-template-columns: 1fr 1fr repeat(2, 125px);
        grid-template-rows: repeat(8, calc(100% / 8));
        gap: 20px;

        .adminImg {
            margin: 0 auto;
            grid-column: 3/5;
            grid-row: 1 / 4;
            p{
                text-align: center;
                font-size: 1.2vw;
            }
            #imgBox {
                width: 250px;
                height: 250px;
                border-radius: 50%;
                border: 2px solid white;
                position: relative;
                background-image: url(../assets/user.png);
                background-repeat: no-repeat;
                background-size: cover;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            label {
                width: 60px;
                height: 60px;
                position: absolute;
                top: 4%;
                right: 3%;
                background-color: #eee;
                color: black;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            label:hover {
                cursor: pointer;
            }
        }
        input {
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            width:  100%;
            height: 50px;
            margin: 30px 0;
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
            background-color: $main-color;
        }

        #submitLabel {
            display: flex;
            width: 50%;
            height: 40px;
            background-color: blue;
            display: flex;
            align-items: center;
            justify-content: center;
            #buttonIcon {
                font-size: 30px;
                position: absolute;
                left: 0;
            }

            #submitButton {
                width: 70%;
                height: 100%;
                background: none;
                outline: none;
                border: none;
                font-size: 20px;
            }
        }

        #submitLabel:hover{
            box-shadow: 2px 2px 10px white;
            cursor: pointer;
            #buttonIcon{
                transform: translateX(60%);
                transition-duration: 1s;
            }
        }

        #address {
            grid-column: 1 /5;
        }
    }

}</style>