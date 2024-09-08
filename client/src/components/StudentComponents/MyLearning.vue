<template>
    <section class="main-section">
        <div class="filter-div">
            <button>completed</button>
            <button class="active">in progress</button>
        </div>
        <div class="course-container" v-for="(course, index) in courses" :key="course">
            <div>
                <div>
                    <img :src="course.courseImg" alt="">
                </div>
                <div>
                    <p>course | {{ course.providerOrginization }}</p>
                    <router-link :to="`/Student/myLearning/${course.courseName}`" class="course-name">{{
            course.courseName }}</router-link>
                    <nav>
                        <progress value="60" max="100" class="w3-blue">33%</progress>
                        <p>60%</p>
                    </nav>
                    <p>overall progress</p>
                </div>
            </div>
            <div>
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical " class="course-menu"
                    @click="rateShareList(index)" />
                <div class="rate-share-list">
                    <p @click="rateButton(index)">rate</p>
                    <p>share</p>
                </div>
            </div>
        </div>
        <!-- rate window -->
        <div class="rateWindow">
            <div>
                <font-awesome-icon icon="fa-solid fa-xmark" class="close" />
                <nav>
                    <img src="" alt="">
                    <p id="courseName"></p>
                </nav>
                <form action="" method="dialog" @submit="rateCourse">
                    <nav>
                        <font-awesome-icon icon="fa-regular fa-star" class="star" value="1" />
                        <font-awesome-icon icon="fa-regular fa-star" class="star" value="2" />
                        <font-awesome-icon icon="fa-regular fa-star" class="star" value="3" />
                        <font-awesome-icon icon="fa-regular fa-star" class="star" value="4" />
                        <font-awesome-icon icon="fa-regular fa-star" class="star" value="5" />
                    </nav>
                    <textarea name="" id="" cols="" rows="" aria-setsize="false" placeholder="leave comment.... "
                        v-model="rateCourseData.comment"></textarea>
                    <nav>
                        <input type="submit" value="send">
                    </nav>
                </form>
            </div>
        </div>
        <div class="rateWindow rateMessage">
            <div>
                <font-awesome-icon icon="fa-solid fa-xmark" class="close" />
                <p>thanks for your opinion</p>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    name: 'MyLearning',
    data: function () {
        return {
            courses: '',
            rateCourseData: {
                id: '',
                comment: '',
                rate: ''
            }
        }
    },
    mounted() {
        document.querySelectorAll('.close').forEach((e, index) => {
            e.addEventListener('click', () => {
                document.querySelectorAll('.rateWindow')[index].style.display = 'none'
            })
        })
        this.getRegisteredCourses()
        let stars = document.querySelectorAll('.star')
        stars.forEach(e => {
            e.addEventListener('click', () => {
                this.rateCourseData.rate = e.getAttribute('value')
            })
        })
    },
    methods: {
        getRegisteredCourses() {
            axios.get('http://localhost:8081/Student/myLearning')
                .then(res => {
                    console.log(res.data)
                    res.data.forEach(course => {
                        course.courseImg = this.filePath(course.courseImg)
                    })
                    this.courses = res.data
                })
        },
        filePath(fileName) {
            return require(`@/assets/imagesUploaded/${fileName}`)
        },
        rateShareList(index) {
            let list = document.querySelectorAll('.rate-share-list')
            list.forEach(e => {
                e.classList.remove('active')
                if (e === list[index]) {
                    list[index].classList.toggle('active')
                }
            })
        },
        starsIn(index) {
            let stars = document.querySelectorAll('.stars')
            for (let i = 0; i <= index; i++) {
                stars[i].style.color = 'red'
            }
        },
        starsOut(index) {
            let stars = document.querySelectorAll('.stars')
            for (let i = index; i >= 0; i--) {
                stars[i].style.color = 'yellow'
            }
        },
        rateButton(index) {
            let courseImg = document.querySelector('.rateWindow img')
            let rateWindow = document.querySelectorAll('.rateWindow')
            let list = document.querySelectorAll('.rate-share-list')
            axios.post('http://localhost:8081/student/myLearning/rateCheck', { courseID: this.courses[index]._id })
                .then(res => {
                    if (res.data) {
                        rateWindow[1].style.display = 'block'
                    } else {
                        rateWindow[0].style.display = 'block'
                    }
                })
            list.forEach(e => {
                e.classList.remove('active')
            })
            document.querySelector('#courseName').innerText = this.courses[index].courseName
            this.rateCourseData.id = this.courses[index]._id
            courseImg.src = this.courses[index].courseImg
        },
        rateCourse() {

            axios.post('http://localhost:8081/student/myLearning/rateCourse', this.rateCourseData)
                .then(res => {
                    console.log(res.data)
                })
        },

    }
}
</script>
<style lang="scss" scoped>
$main-color: #0099ff;
$title-color: black;
$paragrph-color: #666;

.main-section {
    position: absolute;
    width: 100%;
    height: calc(100% - 130px);
    top: 90px;

    // background-color: red;
    .filter-div {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        margin-left: 40px;

        >button {
            padding: 10px 20px;
            background-color: white;
            text-transform: capitalize;
            border-radius: 30px;
            border: 1px solid #333;
            cursor: pointer;
            font-weight: bold;

            &.active {
                background-color: $main-color;
                color: white;
            }
        }
    }

    .course-container {
        width: 92%;
        margin: 20px auto;
        background-color: white;
        display: flex;
        border-radius: 5px;
        text-transform: capitalize;
        box-shadow: 2px 2px 10px #acacac;
        padding: 20px;

        div:nth-child(1) {
            width: 70%;
            display: flex;
            gap: 10px;
            border-right: 1px solid #bfbfbf;
            padding-right: 20px;

            div:nth-child(2) {
                width: 100%;

                .course-name {
                    font-size: 35px;
                    font-family: Arial, Helvetica, sans-serif;
                    color: $main-color;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                nav {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: bold;
                    font-family: Arial, Helvetica, sans-serif;

                    progress {
                        width: 100%;
                        height: 20px;
                    }
                }

                * {
                    margin-bottom: 10px;
                }
            }

            div:nth-child(1) {
                width: 40%;
                border: none;
                padding: 0;

                img {
                    width: 100%;
                    height: 150px;
                    border-radius: 5px;
                }
            }
        }

        div:nth-child(2) {
            position: relative;
            width: 30%;

            .course-menu {
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 20px;
                cursor: pointer;
                padding: 10px;
            }

            .rateCourse-div {
                width: 100%;
                // background-color: red;
                padding: 0 20px;
                font-family: Arial, Helvetica, sans-serif;

                p {
                    margin-bottom: 10px;
                }

                nav {
                    svg {
                        font-size: 25px;
                        cursor: pointer;
                        color: yellow;
                    }

                    margin-bottom: 20px;
                }
            }

            .rate-share-list {
                display: none;
                position: absolute;
                top: 20px;
                right: 0;
                background-color: white;
                box-shadow: 2px 2px 10px #acacac;
                width: fit-content;

                p {
                    width: 70px;
                    text-transform: capitalize;
                    padding: 5px 10px;
                    cursor: pointer;

                    &:hover {
                        color: $main-color;
                    }
                }
            }

            .rate-share-list.active {
                display: block;
            }
        }
    }


    .rateWindow {
        display: none;
        width: 100%;
        height: calc(100% + 130px);
        position: fixed;
        background-color: #acacac41;
        top: -130px;
        z-index: 10000000000000;

        div:nth-child(1) {
            width: 50%;
            height: 60%;
            background-color: white;
            margin: 15% auto;
            border-radius: 10px;
            padding: 20px;
            text-align: right;
            position: relative;

            .close {
                position: absolute;
                top: 20px;
                right: 20px;

                &:hover {
                    cursor: pointer;
                }
            }

            nav {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 20px;
                font-size: 30px;
                color: $main-color;
                padding: 15px;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;

                img {
                    width: 200px;
                    height: 150px;
                    border-radius: 5px;
                }
            }

            form {
                text-align: center;

                nav:nth-child(1) {
                    padding: 0 30%;
                    margin: 30px auto;

                    svg {
                        cursor: pointer;
                    }
                }

                textarea {
                    width: 100%;
                    height: 160px;
                    border-radius: 4px;
                    border-color: #666;
                    resize: none;
                    padding: 10px;
                    margin: 0 auto;
                }

                nav:nth-child(3) {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    height: fit-content;
                    padding: 0;

                    input[type="submit"] {
                        padding: 5px 10px;
                        width: 20%;
                        border: none;
                        cursor: pointer;
                        transition-duration: .5s;

                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
    }

    .rateMessage {
        font-size: 30px;
        color: $main-color;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;

        p {
            text-align: center;
        }
    }
}
</style>