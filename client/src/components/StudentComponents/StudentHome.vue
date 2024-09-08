<template>
    <section class="main-section">

        <div id="courses">
            <div id="coursesTitle">
                <p>create your carrer</p>
            </div>
            <!-- Slider -->
            <div id="slideBar">
                <div class="instructor" v-for="course in courses" :key="course">
                    <router-link :to="`Student/course/${course.courseName}?ID=${course._id}`" class="instructorRouter">
                        <div class="instructorImg">
                            <img :src="course.courseImg" alt="">
                        </div>
                        <div class="instructorDetails">
                            <div class="provider-div">
                                <img :src="course.providerLogo" loading="lazy" alt="">
                                <p>{{ course.providerOrginization }}</p>
                            </div>
                            <h2>{{ course.courseName }}</h2>
                            <p class="description-p">{{ course.description }}</p>
                            <div class="last-info">
                                <p class="course-rate"><font-awesome-icon icon="fa-solid fa-star" />0</p>
                                <p>{{ course.price }}$</p>
                                <p>{{ course.courseHour }}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <button class="show-more" id="show-more-courses" @click="show_more_courses">show 4 more</button>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    name: 'StudentHome',
    data: function () {
        return {
            courses: '',
        }
    },
    mounted() {
        // get courses 
        fetch('http://localhost:8081/getCourse')
            .then(res => {
                return res.json()
            })
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].courseImg = this.imagePath(res[i].courseImg)
                    res[i].providerLogo = this.imagePath(res[i].providerLogo)
                }
                this.courses = res
                console.log(res)
            })
    },
    methods: {
        imagePath(imageName) {
            if (imageName !== '') {
                return require(`@/assets/imagesUploaded/${imageName}`)
            }
        },
        show_more_courses() {
            let coursesLenght = this.courses.length;
            axios.post('http://localhost:8081/getMoreCourses', { "coursesLenght": coursesLenght })
                .then(res => {
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].courseImg = this.imagePath(res.data[i].courseImg)
                            res.data[i].providerLogo = this.imagePath(res.data[i].providerLogo)
                            this.courses.push(res.data[i])
                        }
                        console.log(this.courses)
                        if (res.data.length !== 4) {
                            document.querySelector('#show-more-courses').style.display = "none"
                        }
                    }
                })
        },
    },
}
</script>
<style lang="scss" scoped>
.main-section {
    width: 100%;
    #coursesTitle {
        margin-top: 20px;
    }
}
</style>