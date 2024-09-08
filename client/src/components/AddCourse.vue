<template>
    <section class="main-section">
        <div class="viewer">
            <section id="courseInfo" class="adding-section active">
                <form action="" method="dialog" @submit="addCourse">
                    <div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" id="course-name" placeholder="name" v-model="Data.name" required>
                        </div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" id="department" placeholder="department" v-model="Data.department" required>
                        </div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" placeholder="price" v-model="Data.price">
                        </div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" placeholder="hours" v-model="Data.hours">
                        </div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" placeholder="description" v-model="Data.description">
                        </div>
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <input type="text" placeholder="instructor" v-model="Data.instructor">
                        </div>
                        <!-- provider logo -->
                        <div class="provider-logo-div">
                            <label for="provider-logo" class="provider-logo">
                                <input type="file" name="" id="provider-logo" style="display: none;"
                                    @change="show_image" required>
                                <!-- <p>choose logo for provider</p> -->
                                <font-awesome-icon icon="fa-solid fa-image" />
                            </label>
                            <div>
                                <font-awesome-icon icon="fa-solid fa-building" />
                                <input type="text" name="" id="provider-input" placeholder="provider-name" v-model="Data.provider">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>upload image for course</h3>
                            <label for="main-image" class="upload-label">
                                <input type="file" name="" id="main-image" style="display: none;"
                                    @change="show_main_image" required>
                                <!-- <font-awesome-icon icon="fa-solid fa-image" /> -->
                                <img :src="mainImage" alt="">
                            </label>
                        </div>
                    </div>
                    <span>
                        <input type="submit" value="save" class="submitButton">
                        <input type="submit" value="save with content" class="">
                    </span>
                </form>
            </section>
        </div>
        <div class="process-steps-div">
            <div class="steps">
                <div class="step active">1</div>
                <div class="steps-bar"></div>
                <div class="step">2</div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddCourse',
    data: function () {
        return {
            mainImage: null,
            Data: {
                name: '',
                department: '',
                price: '',
                hours: '',
                description: '',
                instructor: '',
                provider: ''
            }
        }
    },
    mounted() {

    },
    methods: {
        show_main_image(e) {
            const fr = new FileReader()
            fr.onload = () => {
                this.mainImage = fr.result
            }
            fr.readAsDataURL(e.target.files[0])
        },
        // next() {
        //     let addingSection = document.querySelectorAll('.adding-section')
        //     let stepNode = document.querySelectorAll('.step')
        //     let stepBar = document.querySelectorAll('.steps-bar')
        //     addingSection.forEach((e, index) => {
        //         console.log(e.classList.contains('active'))
        //         if (!e.classList.contains('active')) {
        //             stepNode[index].classList.toggle('active')
        //             stepBar[index - 1].classList.toggle('active')
        //             stepNode[index - 1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        //                 <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
        //                 </svg>`
        //         }
        //         e.classList.toggle('active')
        //     })
        //     this.ckeckButtonStatus()
        // },
        // back() {
        //     let addingSection = document.querySelectorAll('.adding-section')
        //     let stepNode = document.querySelectorAll('.step')
        //     let stepBar = document.querySelectorAll('.steps-bar')
        //     addingSection.forEach((e, index) => {
        //         console.log(e.classList.contains('active'))
        //         if (e.classList.contains('active')) {
        //             stepNode[index].classList.toggle('active')
        //             stepBar[index - 1].classList.toggle('active')
        //             stepNode[index - 1].innerHTML = index
        //         }
        //         e.classList.toggle('active')
        //     })
        //     this.ckeckButtonStatus()
        // },
        ckeckButtonStatus() {
            let addingSection = document.querySelectorAll('.adding-section')
            addingSection.forEach(() => {
                if (addingSection[0].classList.contains('active')) {
                    console.log('asdasd')
                    document.querySelector('.backButton').disabled = true
                    document.querySelector('.nextButton').disabled = false
                } else if (addingSection[addingSection.length - 1].classList.contains('active')) {
                    document.querySelector('.nextButton').disabled = true
                    document.querySelector('.backButton').disabled = false
                } else {
                    document.querySelector('.backButton').disabled = false
                    document.querySelector('.nextButton').disabled = false
                }
            })
        },
        addCourse() {
            let formData = new FormData();
            formData.append('provider_logo', document.querySelector('#provider-logo').files[0])
            formData.append('course_image', document.querySelector('#main-image').files[0])
            formData.append("new_course_data", JSON.stringify(this.Data))
            axios.post('http://localhost:8081/Admin/courses/AddCourse', formData)
                .then(res => {
                    if (res.data.status === true) {
                        // this.$router.push({ path: `/Admin/courses/CourseContent`, query : {ID : res.data.courseID} }) equal the bottom =>
                        this.$router.push(`/Admin/courses/CourseContent/${res.data.courseName}`)
                    } else {
                        console.log("add course falied")
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.main-section {
    margin-top: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    .viewer {
        width: 90%;
        height: 100%;
        .adding-section {
            &.active {
                display: block;
            }

            display: none;
            width: 100%;
            height: 100%;
            padding: 30px 40px;
            form {
                display: flex;
                gap: 10px;

                div:nth-child(1) {
                    width: 50%;
                    height: 100%;

                    div {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        background: none;
                        text-align: center;
                        margin-bottom: 30px;
                        border-radius: 10px 0 0 10px;

                        input[type="text"] {
                            width: 95%;
                            height: 34px;
                            border: none;
                            padding-left: 10px;
                            outline: none;
                            transition-duration: .5s;

                            &::placeholder {
                                text-transform: capitalize;
                            }

                            &:focus {
                                border-right: 4px solid blue;
                            }
                        }

                        >svg {
                            width: 5%;
                            padding: 7px;
                            font-size: 20px;
                            border-radius: 10px 0 0 10px;
                            // border: 3px solid #444;
                            background-color: #333;
                            color: white;
                        }
                    }

                    .provider-logo-div {
                        display: flex;
                        flex-wrap: wrap;

                        div {
                            display: flex;
                            align-items: center;
                            width: calc(100% - 70px);
                            margin: 0;
                        }

                        label.provider-logo {
                            width: 60px;
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            border: 2px dotted #444;
                            border-radius: 50%;
                            margin-right: 10px;
                            cursor: pointer;

                            svg {
                                font-size: 25px;
                                background: none;
                                color: #444;
                                padding: 0;
                                font-size: 30px;
                            }

                            p {
                                width: 50%;
                                font-size: 12px;
                                font-weight: 800;
                            }
                        }
                    }
                }

                div:nth-child(2) {
                    width: 50%;
                    height: 100%;

                    div {
                        width: 100%;
                        height: fit-content;
                        text-align: center;

                        h3 {
                            text-transform: capitalize;
                            margin-bottom: 20px;
                            font-family: Arial, Helvetica, sans-serif;

                        }

                        label.upload-label {
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 10px;
                            width: 80%;
                            height: 300px;
                            font-size: 15px;
                            text-align: center;
                            border: 3px dotted #444;
                            cursor: pointer;
                            background-repeat: no-repeat;
                            background-size: contain;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 10px;
                            }

                            svg {
                                font-size: 60px;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
                span{
                    width: 20%;
                    position: absolute;
                    bottom: 20px;
                    right: 17%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 20px;
                    input[type="submit"]{
                        padding: 5px 10px;
                        width: 200px;
                        font-weight: bold;
                        cursor: pointer;
                    }   
                }
            }
        }
    }

    .process-steps-div {
        width: 10%;
        height: 100%;
        position: relative;

        .steps {
            position: absolute;
            width: 100%;
            height: 90%;
            top: 2%;

            .step {
                overflow: hidden;
                border-radius: 50%;
                text-align: center;
                margin-right: auto;
                margin-left: auto;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                background-color: #333;
                color: white;
                user-select: none;
                transition-duration: 1s;

                &.active {
                    background-color: rgb(26, 119, 224);
                }
            }

            .steps-bar {
                width: 10px;
                height: 15%;
                background-color: #333;
                margin: 0 auto;
                transition-duration: .5s;

                &.active {

                    background-color: rgb(26, 119, 224);
                }
            }
        }
    }

}
</style>