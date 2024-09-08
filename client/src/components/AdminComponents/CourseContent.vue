<template>
    <section class="main-section">
        <div class="side-bar">
            <div>
                <img :src="courseData.courseImg" alt="">
                {{ courseData.courseName }}
            </div>
            <div class="weeks-div">
                <ul>
                    <li v-for="(week) in weeksCount" :key="week" class="week-li active">weeks {{ week }}</li>
                </ul>
            </div>
            <button @click="weeksCount += 1">add week</button>
        </div>
        <div class="viewer">
            <form action="" method="dialog" class="course-content-form" @submit="sendData">
                <div class="week-title-nav active">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="weeks-div-arrow"
                            @click="changeHeight" />
                        <input type="text" id="weekTitle" placeholder="week title" class="input" EType="h1">
                        <!-- <font-awesome-icon icon="fa-solid fa-sliders" /> -->
                    </div>
                    <div class="week-content">
                        <!-- <textarea type="text" name="" id="weekDescription" cols="" rows="" placeholder="this week description" class="input"></textarea> -->

                        <!-- here the content of course -->
                    </div>
                    <input type="submit" value="publish" class="publishButton">
                </div>
            </form>
            <div class="tool-box">
                <font-awesome-icon icon="fa-solid fa-feather" class="svg svg1" @click="addTextarea" />
                <font-awesome-icon icon="fa-solid fa-file-arrow-up" class="svg svg2" @click="addFileInput" />
                <font-awesome-icon icon="fa-solid fa-heading" class="svg svg3" @click="addH1" />
                <!-- <font-awesome-icon icon="fa-solid fa-image" class="svg svg-img" />
                <font-awesome-icon icon="fa-solid fa-video" class="svg svg-video"/>-->
                <font-awesome-icon icon="fa-solid fa-toolbox" class="add-content-form" @click="toolBox" />
                <!-- <button class="add-content-form"></button> -->
            </div>
        </div>
        <div>

        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CourseContent',
    data: function () {
        return {
            weeksCount: 1,
            courseData: '',
            mediaFile: null,
            weeks: []
        }
    },
    mounted() {
        this.getCourseData()
    },
    methods: {
        getCourseData() {
            axios.get(`http://localhost:8081/Admin/courses/CourseContent/${this.$route.params.courseName}`)
                .then(res => {
                    console.log(res.data)
                    res.data.courseImg = this.filePath(res.data.courseImg)
                    this.courseData = res.data
                })
        },
        filePath(fileName) {
            return require(`@/assets/imagesUploaded/${fileName}`)
        },
        changeHeight() {
            let weekNav = document.querySelector('.week-title-nav')
            weekNav.classList.toggle('active')
        },
        addTextarea() {
            let weekNav = document.querySelector('.week-content')
            let textarea = document.createElement('textarea')
            let textareaStyle = `
                margin: 0 50px;
                width: 92%;
                height: 30%;
                text-wrap: wrap;
                border: 2px solid #333;
                border-radius: 4px;
                padding: 10px;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;
            `
            // let textareastyled = getComputedStyle(document.querySelector('#weekDescription'))
            // // for (let i = 0; i < textareastyled.length; i++) {
            // //     textareaStyle += `${textareastyled[i]} : ${textareastyled.getPropertyValue(textareastyled[i])};`
            // // }
            textarea.id = "weekDescription";
            textarea.classList.add('input')
            textarea.style.cssText = textareaStyle
            textarea.setAttribute('etype','p')
            weekNav.appendChild(textarea)
        },
        addFileInput() {
            let weekNav = document.querySelector('.week-content')
            let fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.setAttribute('etype','video')
            fileInput.classList.add('input')
            fileInput.style.cssText = `
                width: 100%;
                margin: 20px 50px ;
            `
            weekNav.appendChild(fileInput)
        },
        preview(e) {
            const fr = new FileReader()
            fr.onload = () => {
                this.mediaFile = fr.result
            }
            fr.readAsDataURL(e.target.files[0])
        },
        addH1() {
            let weekNav = document.querySelector('.week-content')
            let fileInput = document.createElement('input')
            fileInput.type = 'text'
            fileInput.setAttribute('EType','h3')
            fileInput.classList.add('input')
            fileInput.style.cssText = `
                width: 80%;
                margin: 20px 50px ;
            `
            weekNav.appendChild(fileInput)
        },
        sendData() {
            let allInput = document.querySelectorAll('.input')
            let formData = new FormData()
            allInput.forEach((e) => {
                switch (e.getAttribute('etype')) {
                    case 'video':
                        formData.append('media', e.files[0])
                        formData.append('content', JSON.stringify({ type: 'video', fileName: e.files[0].name }))
                        break;
                    case 'p':
                        formData.append('content', JSON.stringify({ type: 'p', text: e.value }))
                        break;
                    case 'h1':
                        formData.append('content', JSON.stringify({ type: 'h1', text: e.value }))
                        break;
                    case 'h3':
                        formData.append('content', JSON.stringify({ type: 'h3', text: e.value }))
                        break;
                    default:
                        break;
                }   
            })
            // formData.append('content',document.querySelector('.week-content').innerHTML)
            axios.post(`http://localhost:8081/Admin/Courses/CourseContent/${this.$route.params.courseName}`, formData)

        },
        toolBox() {
            let toolBox = document.querySelectorAll('.svg')
            toolBox.forEach(e => {
                e.classList.toggle('opened')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$main-color: #2b9eea;

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    user-select: none;

    .main-section {
        margin-top: 40px;
        width: 100%;
        height: calc(100% - 40px);
        display: flex;

        .side-bar {
            width: 20%;
            height: 100%;
            background-color: white;
            position: relative;

            div:nth-child(1) {
                width: 100%;
                height: 120px;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 20px;
                font-size: 25px;
                font-family: Arial, Helvetica, sans-serif;
                color: #2b9eea;
                border-bottom: 2px solid #eee;

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }

            div:nth-child(2) {
                height: calc(100% - 200px);
                overflow-y: auto;

                ul {
                    width: 100%;
                    padding: 20px;
                    list-style: none;

                    li {
                        padding: 10px 20px;
                        margin-bottom: 10px;
                        text-transform: capitalize;
                        font-family: Arial, Helvetica, sans-serif;
                        border-radius: 4px;
                        transition-duration: .5s;
                        border: 1px solid white;
                        // background-color: red;
                        cursor: pointer;

                        &.active {
                            background-color: #2b9eea2c;
                            border: 1px solid #2b9eea;
                        }

                        &:hover {
                            background-color: #2b9eea2c;
                            border: 1px solid #2b9eea;
                        }
                    }
                }
            }

            >button {
                position: absolute;
                bottom: 10px;
                right: 20px;
                padding: 5px 10px;
                text-transform: capitalize;
                font-weight: bold;
            }
        }

        .viewer {
            width: 60%;
            height: 100%;
            padding: 20px;
            position: relative;

            .course-content-form {
                width: 100%;
                height: 100%;
                position: relative;

                .week-title-nav {
                    background-color: white;
                    position: absolute;
                    top: 0px;
                    width: 100%;
                    height: 35px;
                    border: 2px solid $main-color;
                    border-radius: 4px;
                    margin-bottom: 20px;
                    overflow: hidden;
                    transition-duration: .5s;

                    &.active {
                        height: 100%;
                        overflow: auto;

                        >div {
                            >svg {
                                transform: rotate(90deg);
                            }
                        }
                    }

                    div:nth-child(1) {
                        display: flex;
                        margin-bottom: 10px;

                        >svg {
                            transition-duration: .3s;
                            padding: 8px 10px;
                            cursor: pointer;

                            &:hover {
                                background-color: #2b9eea27;
                            }
                        }

                        input[type="text"] {
                            width: 100%;
                            height: 30px;
                            border: none;
                            outline: none;
                            border-radius: 0 4px 4px 0;
                            padding-left: 10px;
                            text-transform: capitalize;
                        }
                    }

                    .week-content {
                        width: 100%;
                        padding: 0 50px;
                        overflow-x: hidden;

                        textarea {
                            margin: 0 50px;
                            width: 92%;
                            height: 30%;
                            text-wrap: wrap;
                            border: 2px solid #333;
                            border-radius: 4px;
                            padding: 10px;
                            text-transform: capitalize;
                            font-family: Arial, Helvetica, sans-serif;
                        }

                        input[type='file'] {
                            width: 100%;

                        }
                    }

                    .publishButton {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 150px;
                        height: 35px;
                        border-radius: 40px 0 0 0;
                        cursor: pointer;
                        border: 1px solid $main-color;
                        text-transform: capitalize;
                        font-weight: bold;

                    }
                }
            }

            .tool-box {
                color: $main-color;

                .svg {
                    position: absolute;
                    border-radius: 50%;
                    background-color: white;
                    padding: 10px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    transition-duration: 1s;
                    opacity: 0;

                    &.svg1 {
                        left: 23px;
                        bottom: 20px;

                        &.opened {
                            left: 90px;
                            bottom: 20px;
                            box-shadow: 2px 2px 10px black;
                            opacity: 1;

                        }
                    }

                    &.svg2 {
                        left: 23px;
                        bottom: 20px;

                        &.opened {
                            left: 70px;
                            bottom: 70px;
                            box-shadow: 2px 2px 10px black;
                            opacity: 1;

                        }
                    }

                    &.svg3 {
                        left: 23px;
                        bottom: 20px;

                        &.opened {
                            left: 20px;
                            bottom: 90px;
                            box-shadow: 2px 2px 10px black;
                            opacity: 1;

                        }
                    }

                    &.svg-img {
                        right: 120px;
                        bottom: 80px;
                    }

                    &.svg-video {
                        right: 80px;
                        bottom: 120px;
                    }

                }

                .add-content-form {
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    position: absolute;
                    left: 20px;
                    bottom: 20px;
                    border-radius: 50%;
                    background-color: white;
                    padding: 10px;
                    box-shadow: 2px 2px 10px black;
                    cursor: pointer;
                }
            }
        }

        div:nth-child(3) {
            width: 20%;
            height: 100%;
            background-color: white;
        }
    }
}

@keyframes toolShow {
    from {
        left: 20px;
        bottom: 20px;
        opacity: 0;
    }
}

@keyframes toolShowDown {
    to {
        left: 20px;
        bottom: 20px;
        opacity: 0;
    }
}
</style>
