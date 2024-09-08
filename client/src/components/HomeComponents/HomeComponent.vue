<template>
    <section class="main-section">
        <!-- home section -->
        <section id="homeContent">
            <div id="">
                <div id="intro">
                    <p id="introText">
                        <span class="introFirstSpan"> </span><br>
                        <span id="introParagraph">
                            Build Your Work Carerr By Improving Your Skills By Our Courses With Top Instructor In The
                            World
                        </span>
                    </p>
                </div>
                <div id="introImg">
                    <img src="@/assets/undraw_online_learning_re_qw08.svg" alt="">
                </div>
                <svg class="svgWaves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="1"
                        d="M0,288L48,261.3C96,235,192,181,288,149.3C384,117,480,107,576,133.3C672,160,768,224,864,245.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>
            </div>
        </section>
        <!-- de -->
        <section id="features">
            <div class="details">
                <div id="mainDetail" class="hidden">
                    <p>
                        <span>improve your self by our courses</span><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio eius adipisci hic odit qui. Ullam fugiat nam laboriosam.
                        Optio nihil atque aliquid temporibus omnis, magnam eius iste alias illo numquam!
                    </p>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>

                <div class="detailsDiv hidden">
                    <div class="detailImg">

                    </div>
                    <div class="detailsDivText">
                        <h2>Outstanding Designs</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil
                            vel incidunt ad quia magni fuga iure saepe libero dicta.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- courses Section -->
        <section id="coursesSection">
            <div id="courses">
                <div id="coursesTitle">
                    <h1 class="title">get your degrees</h1>
                    <p>explor our courses</p>
                </div>
                <!-- Slider -->
                <div id="slideBar">
                    <Course v-for="course in courses" :key="course" :course_id="course._id" :name="course.courseName"
                        :department="course.category" :hours="course.courseHour" :price="course.price"
                        :instructor="course.instructor" :language="course.language"
                        :provider="course.providerOrginization" :provider_logo="course.providerLogo"
                        :img="course.courseImg" :description="course.description" id="CourseComponent" />
                </div>
                <button class="show-more" id="show-more-courses" @click="show_more_courses">show 4 more</button>
            </div>
        </section>
        <!-- End courses Section -->
    </section>
</template>
<script>
import Course from '../Course.vue'
import axios from 'axios';
export default {
    name: 'HomeComponents',
    components: {
        Course
    },
    data: function () {
        return {
            membership: '',
            courses: '',
        }
    },
    mounted() {
        if (localStorage.role != undefined) {
            this.$router.push({ path: `/${localStorage.role}` })
        }

        // 
        const introText = document.querySelector('.introFirstSpan')
        const mainText = `Improve Your Self By Our Courses`
        let i = 0
        let j = 0
        function introTitle() {
            introText.innerText += mainText.split(' ')[j][i]
            i += 1
            if (i == mainText.split(' ')[j].length) {
                i = 0
                j += 1
                introText.innerText += `\xa0`
            }
            if (j == mainText.split(' ').length) {
                clearInterval(mainTextInterval)
                if (document.querySelector('#introParagraph')) {
                    document.querySelector('#introParagraph').style = `opacity: 1;`
                }
            }
        }
        const mainTextInterval = setInterval(introTitle, 200)

        // getting memberShip count
        fetch("http://localhost:8081/")
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.membership = res.membership
            })
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

        const observe = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                } else {
                    entry.target.classList.remove('show')
                }
            })
        })
        const hiddenElements = document.querySelectorAll('.hidden')
        hiddenElements.forEach(el => {
            observe.observe(el)
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
        }
    },
}
</script>