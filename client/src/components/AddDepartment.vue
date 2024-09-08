<template>
    <section>
        <form @submit="newDepartment" enctype="multipart/form-data" method="dialog">
            <div id="departmentsForm">
                <input type="text" name="" id="categoryName" class="textInput" placeholder="new department name" v-model="newDepartmentData.name">
                <textarea name="" id="categoryDescrib" cols="30" rows="10" class="textInput" placeholder="department description" v-model="newDepartmentData.description"></textarea>
                <div id="categoryCourses" class="textInput" >
                    <div id="departmetListLabel" @click="coursesList">
                        <p id="departmetListLabelParagrph">Choose the courses for this departmet</p>
                        <div>
                            <font-awesome-icon :icon="coursesArrowState" id="coursesArrowSvg" />
                        </div>
                    </div>
                    <div id="departmentListContaint">
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>programming</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>2</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                        <div class="coursesListItem unselected"><span><font-awesome-icon icon="fa-regular fa-square" /></span><p>3</p></div>
                    </div>
                </div>
                <label id="submitLabel" for="submitButton">
                    <font-awesome-icon id="buttonIcon" icon="fa-solid fa-file-import" />
                    <input type="submit" value="validate" id="submitButton">
                </label>
            </div>
            <nav class="teacherImg">
                <p>upload department photo</p>
                <div id="imgBox">
                    <img :src="departmentImg" alt="" id="image">
                </div>
                <label for="fileInput" class="bar fileInputLabal" id="">
                    <font-awesome-icon  icon="fa-solid fa-pencil" />
                    <input type="file" name="" id="fileInput" accept="image/*" style="display: none;" @change="uploadImg">
                </label>
            </nav>
        </form>
    </section>
</template>

<script>
const axios = require('axios')
export default {
    name: 'AddDepartment',
    data: function(){
        return{
            departmentImg: null,
            newDepartmentData: {
                name: '',
                courses: [],
                description: '',
                departmentImg: ''
            },
            uploadPhoto: '',
            coursesArrowState : 'fa-solid fa-angle-down',
        }
    },
    mounted(){
        // Get all courses  name
        axios.get('http://localhost:8081/Admin/departments/addDepartment',{
            withCerdentials : true
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        
        // End the getting

        // courses list for department (on click on item in the list)
        const coursesListItem = document.querySelectorAll('.coursesListItem')
        const departmetListLabelParagrph = document.querySelector('#departmetListLabelParagrph')
        let choosedCounter = 0
        coursesListItem.forEach((e) => {
            e.addEventListener('click',() => {
                if(e.classList.contains('selected')){
                    e.firstChild.innerHTML = '<svg data-v-1bfe6553="" class="svg-inline--fa fa-square" aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="" fill="currentColor" d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path></svg>'
                    e.classList.remove('selected')
                    e.classList.add('unselected')
                    const searchItem = e.firstChild.innerText
                    const foundIndex = this.newDepartmentData.courses.indexOf(searchItem)
                    this.newDepartmentData.courses.splice(foundIndex,1)
                    choosedCounter -=1
                }else{
                    e.firstChild.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>'
                    this.newDepartmentData.courses.push(e.innerText)
                    console.log(this.newDepartmentData.courses)
                    e.classList.remove('unselected')
                    e.classList.add('selected')
                    choosedCounter += 1
                }
                if(choosedCounter > 0){
                    departmetListLabelParagrph.innerText = `${choosedCounter} Course Selected`
                }else{
                    departmetListLabelParagrph.innerText = 'choose the courses for this department'
                }
                console.log(this.newDepartmentData.courses)
            })
        })
        // End this function
    },
    methods:{
        newDepartment(){
            const formData = new FormData()
            formData.append('file',this.uploadPhoto)
            formData.append('newDepartmentData',JSON.stringify(this.newDepartmentData))
            axios.post('http://localhost:8081/Admin/departments/addDepartment',formData)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
            })
        },
        uploadImg(event){
            let fr = new FileReader()
            fr.onload = () => {
                this.departmentImg = fr.result
            }
            fr.readAsDataURL(event.target.files[0])
            this.uploadPhoto = event.target.files[0]
        },
        coursesList(){
            const list = document.querySelector("#departmetListLabel")
            const coursesList = document.querySelector('#departmentListContaint')
            if(this.coursesArrowState === 'fa-solid fa-angle-down'){
                list.classList.add('open')
                coursesList.style.display = 'block'
                this.coursesArrowState = 'fa-solid fa-angle-up'
            }else{
                coursesList.style.display = 'none'
                list.classList.remove('open')
                this.coursesArrowState = 'fa-solid fa-angle-down'  
            }
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
    padding: 20px;
    margin: 2% 1%;
    overflow: hidden;

    form {
        width: 100%;
        height: 100%;
        display: flex;
        #departmentsForm{
            width: 80%;
            display: block;
            #categoryCourses{
                max-width: 50%;
                user-select: none;
                position: relative;
                border: none;
                background-color: $main-color;
                border-bottom: 2px solid blue;
                #departmetListLabel{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    right: 0;
                    p{
                        padding-left: 10px;
                    }
                    svg{
                        padding: 10px;
                    }
                }
                #departmentListContaint{
                    display: none;
                    position: absolute;
                    left: 0;
                    z-index: 1000;
                    background-color: #202737;
                    color: white ;
                    width: 100%;
                    max-height: 200px;
                    overflow: auto;
                    top: 50px;
                    svg{
                        font-size: 20px;
                    }
                    div{
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        padding: 10px;
                        p{
                            margin-left: 5px;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                    }
                    div:hover{
                        background-color: #205e87;
                    }
                }
            }
            .textInput{
                width:  90%;
                height: 50px;
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
            }
            .textInput:focus{
                border-bottom-color: white;
            }
            #submitLabel{
                display: flex;
                width: 25%;
                height: 40px;
                background-color: blue;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                // border-radius:100% 0% 100% 0% / 45% 65% 35% 55% ;
                border-radius: 0 10px 0 10px;
                z-index: -1;
                transition-duration: 1s;

                #buttonIcon{
                    font-size: 30px;
                    color: white;
                    position: absolute;
                    left: 0;
                }
                #submitButton{
                    width: 70%;
                    height: 100%;
                    background: none;
                    color: white;
                    font-weight: bold;
                    text-transform: capitalize;
                    outline:  none;
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
        }

        
        .teacherImg {
            margin: 0 auto;
            width:  300px;
            height: fit-content;
            position: relative;
            p {
                width: 300px;
                text-align: center;
                margin-bottom: 10px;
                text-transform: capitalize;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                color: #eee;
            }
            #imgBox {
                width: 300px;
                height: 300px;
                border: 2px solid white;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            label {
                width: 40px;
                height: 40px;
                position: absolute;
                right: 0;
                bottom: 0;
                background-color: #eee;
                // margin-top: -40px;
                color: black;
                border-radius: 100% 0% 100% 0% / 100% 100% 0% 0% ;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            label:hover {
                cursor: pointer;
            }
        }
    }
}
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background-color: #1b2131;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #666 ;
    border-radius: 20px;
}

// extra small devices
@media only screen and (max-width: 600px){
    section form {
        display: block;
    }
}
</style>