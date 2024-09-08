<template>
    <section class="main-section">
        <div class="loader-div">
            <div class="loader" @load="loading"></div>
        </div>
        <div class="course-image-div">
            <img :src="courseData.courseImg" alt="">
            <div class="enroll-div">
                <p>start now</p>
                <p>do not late</p>
                <button class="enroll-button" @click="enroll">enroll now</button>
                <button class="favorite-button">add to favorite</button>
            </div>
            <div class="course-name-div">
                <p>{{ courseData.courseName }} course</p>
                <div>
                    <img :src="courseData.providerLogo" alt="">
                    <p>{{ courseData.providerOrginization }}</p>
                </div>
            </div>
            <div class="details-div">
                <div>
                    <h3>this course</h3>
                    <p>
                        {{courseData.description}}
                    </p>
                </div>
                <div>
                    <h3>application requirments</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus in vel
                    </p>
                </div>
                <div>
                    <h3>application requirments</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus in vel
                    </p>
                </div>
                <div>
                    <h3>application requirments</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus in vel
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';

export default {
    name: "CourseInfo",
    data: function () {
        return {
            courseData: ''
        }
    },
    mounted() {
        this.getCourseData()
    },
    methods: {
        getCourseData() {
            axios.get(`http://localhost:8081/course/${this.$route.params.courseName}?ID=${this.$route.query.ID}`)
                .then(res => {
                    const { courseData, enrolledStatus } = res.data
                    courseData.courseImg = this.filePath(courseData.courseImg)
                    courseData.providerLogo = this.filePath(courseData.providerLogo)
                    this.courseData = courseData
                    console.log(courseData)
                    if (enrolledStatus) {
                        document.querySelector('.enroll-div').style.display = 'none'
                    }
                })
        },
        filePath(fileName) {
            return require(`@/assets/imagesUploaded/${fileName}`)
        },
        enroll() {
            this.$router.push('/login')
        },
        loading(){
            document.querySelector('.loader-div').style.display = ''
            document.querySelector('.course-image-div').style.display = 'none'
            
        }
    }
}
</script>
<style lang="scss" scoped>
$main-color: #0099ff;
$title-color: black;
$paragrph-color: #666;

.main-section {
    width: 100%;
    height: calc(100% - 70px);
    top: 70px;
    position: absolute;

    .course-image-div {
        position: relative;
        width: 100%;
        height: 85%;
        top: 0;

        img {
            width: 100%;
            height: 100%;
        }

        .details-div {
            width: 90%;
            height: 120px;
            background-color: white;
            bottom: calc(-120px / 2);
            right: 5%;
            position: absolute;
            box-shadow: 2px 2px 10px #333;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            padding: 15px;

            >div {
                width: 25%;
                font-family: Arial, Helvetica, sans-serif;

                h3 {
                    margin-bottom: 10px;
                    color: #333;
                    text-transform: capitalize;
                }

                p {
                    // max-width: 70%;
                    color: #666;
                }
            }
        }

        .enroll-div {
            width: 30%;
            height: 45%;
            position: absolute;
            top: 30%;
            left: 6%;
            padding: 20px;
            background-color: white;
            text-transform: capitalize;
            border-radius: 10px;

            p:nth-child(1) {
                color: black;
                font-weight: bold;
                font-size: 20px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            p:nth-child(2) {
                margin-bottom: 20px;
                margin-left: 10px;
                color: #666;
                font-size: 18px;
                // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

            }

            button {
                width: 100%;
                border: none;
                padding: 15px 30px;
                font-size: 15px;
                text-transform: capitalize;
                font-weight: bold;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                cursor: pointer;
                border-radius: 5px;
                transition-duration: .5s;

                &:hover {
                    font-size: 20px;
                }
            }

            .enroll-button {
                background-color: blue;
                margin-bottom: 10px;
                color: white;
            }

            .favorite-button {
                border: 2px solid blue;
                background-color: white;
                color: blue;
            }
        }

        .course-name-div {
            position: absolute;
            top: 30%;
            right: 6%;
            color: white;
            text-transform: capitalize;
            font-size: 50px;

            div {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-size: 30px;

                img {
                    width: 60px;
                    border-radius: 50%;
                }
            }
        }
    }
}






// loading
:root {
    color-scheme: dark;
}
.loader-div{
    position: absolute;
    width: 100%;
    height: calc(100% );
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 1000000000000;
    display: none;
}
.loader {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
    animation: roll 2s linear infinite;
    z-index: 1000000;
}

@keyframes roll {
    0% {
        transform: rotate(0deg);
        filter: hue-rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
        filter: hue-rotate(360deg);
    }
}

.loader::before {
    content: "";
    position: absolute;
    top: 6px;
    right: 6px;
    bottom: 6px;
    left: 6px;
    background-color: linen;
    border-radius: 50%;
    z-index: 1000;
}

.loader::after {
    content: "";
    position: absolute;
    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #000;
    border-radius: 50%;
    z-index: 1;
    filter: blur(30px);

}</style>