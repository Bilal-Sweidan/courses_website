<template>
    <section id="home">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <header class="page-header">
            <div id="logo">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="graduationIcon" />
                <p>Ncourse</p>
            </div>
            <nav id="infoNavBar">
                <ul>
                    <li>browse<font-awesome-icon icon="fa-solid fa-angle-down" /></li>
                    <li>
                        <label for="search" id="searchLabal">
                            <font-awesome-icon icon="fa-solid fa-search" />
                            <input type="search" placeholder="Search for online courses" id="search">
                        </label>
                    </li>
                    <li id="homeLink"><router-link to="/Student">home</router-link></li>
                    <li id="pageLink">
                        pages<font-awesome-icon icon="fa-solid fa-angle-down" class="pageArrow" />
                        <div id="pagePrompt">
                            <div id="contentPagePrompt">
                                <div id="pages">
                                    <h5>Browse Overview</h5>
                                    <div id="links">
                                        <ul>
                                            <li><font-awesome-icon icon="fa-solid fa-address-card"
                                                    class="pageIcons" />about
                                                ust</li>
                                            <li><font-awesome-icon icon="fa-solid fa-person-chalkboard"
                                                    class="pageIcons" /><router-link to="/student/myLearning">my
                                                    learning</router-link></li>
                                            <li><font-awesome-icon icon="fa-solid fa-lightbulb"
                                                    class="pageIcons" />membership</li>
                                            <li><font-awesome-icon icon="fa-solid fa-compass" class="pageIcons" />single
                                                instructor</li>
                                            <li><font-awesome-icon icon="fa-solid fa-message" class="pageIcons" />FAG
                                            </li>
                                            <li><font-awesome-icon icon="fa-solid fa-umbrella"
                                                    class="pageIcons" />become
                                                instructor</li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="img">
                                    <img src="../assets/progrmmer-with-laptop-.png" alt="" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="courseLink">
                        courses<font-awesome-icon icon="fa-solid fa-angle-down" class="courseArrow" />
                        <div id="coursePrompt">
                            <ul>
                                <li>courses list</li>
                                <li>courses grid</li>
                                <li>courses taken</li>
                                <li>single courses</li>
                            </ul>
                        </div>
                    </li>
                    <li id="blogLink">
                        blog<font-awesome-icon icon="fa-solid fa-angle-down" class="blogArrow" />
                        <div id="blogPrompt">
                            <ul>
                                <li>blog list</li>
                                <li>blog grid</li>
                                <li>single blog</li>
                            </ul>
                        </div>
                    </li>
                    <li>content</li>
                </ul>
            </nav>
            <nav class="setting-nav">
                <div>
                    <img :src="student_data.photo" alt="">
                </div>
                <font-awesome-icon icon="fa-solid fa-caret-down" class="user-list-icon" />
            </nav>
        </header>
        <div class="setting-sidebar" status="close">
            <div>
                <ul>
                    <nav class="setting-nav">
                        <img :src="student_data.photo" alt="">
                        <div>
                            <p>{{ student_data.full_name }}</p>
                            <p>{{ student_data.role }}</p>
                        </div>
                    </nav>
                    <li><router-link to=""><font-awesome-icon icon="fa-solid fa-user" />account</router-link></li>
                    <li><router-link to=""><font-awesome-icon icon="fa-solid fa-inbox" />inbox</router-link></li>
                    <li><router-link to="/student/setting"><font-awesome-icon
                                icon="fa-solid fa-gear" />setting</router-link></li>
                    <li><router-link to="/signin" @click="logOut"><font-awesome-icon
                                icon="fa-solid fa-arrow-right-from-bracket" />log out</router-link></li>
                </ul>
            </div>
        </div>
        <!-- secondary section of pages  -->
        <section id="coursesSection">
            <router-view></router-view>
        </section>
        <!-- End courses Section -->
    </section>
</template>
<script>
import LoadingComponent from '@/components/LoadingComponent.vue';
import axios from 'axios';
export default {
    name: 'StudentView',
    components: {
        LoadingComponent
    },
    data: function () {
        return {
            student_data: '',
            isLoading: true,
        }
    },
    mounted() {
        // loading timer
        setTimeout(() => {
            this.isLoading = false
        }, 1500);
        // get user data 
        axios.get(`http://localhost:8081/Student`)
            .then(res => {
                if (res.data) {
                    console.log(res.data)
                    if (res.data.photo) {
                        res.data.photo = this.file_path(res.data.photo)
                    }
                    this.student_data = res.data
                } else {
                    localStorage.clear()
                    this.$router.push({ path: '/signin' })
                }
            })
        // setting sidebar
        let setting_button = document.querySelector('.setting-nav')
        let setting_div = document.querySelector('.setting-sidebar')
        setting_button.addEventListener('click', () => {
            if (setting_div.getAttribute('status') === 'close') {
                setting_div.setAttribute('status', 'open')
                document.querySelector('.setting-nav svg').style.transform = 'rotate(180deg)'
            } else {
                setting_div.setAttribute('status', 'close')
                document.querySelector('.setting-nav svg').style.transform = 'rotate(0deg)'
            }
        })
        // if (this.student_data !== null) {
        //     this.$router.push({ path: "/student" })
        // }
        this.studentPagesHeader()
    },
    methods: {
        file_path(file) {
            return require(`../assets/imagesUploaded/${file}`)
        },
        logOut() {
            axios.post('http://localhost:8081/logOut')
            localStorage.clear()
        },
        identity_missed() {
            if (this.student_data.photo == null) {
                console.log('missed data')
                this.$router.push({ path: '/student/setting' })
            }
        },
        studentPagesHeader() {
            let li = document.querySelectorAll('.student-pages-header ul li')
            li.forEach(e => {
                e.addEventListener('click', () => {
                    if (e.classList.value != 'active') {
                        e.classList.toggle("active")
                        li.forEach(e2 => {
                            if (e != e2) {
                                e2.classList.remove('active')
                            }
                        })
                    }
                })
            })
        }

    },
}
</script>
<style lang="scss" scoped>
$main-color: #0099ff;
$title-color: black;
$paragrph-color: #666;

* {
    padding: 0;
    box-sizing: border-box;
    margin: 0;
}

#home {
    .setting-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 50%;
            border-color: white;
        }

        svg {
            font-size: 15px;
        }

    }

    .page-header {
        .setting-nav {
            position: relative;

            &::after {
                content: '';
                width: 13px;
                height: 13px;
                position: absolute;
                background-color: red;
                border-radius: 50%;
                top: 0px;
                right: 15px;
                text-align: center;
                font-weight: bold;
                color: white;
            }

            @extend .setting-nav
        }
    }

    .setting-sidebar {
        box-shadow: 2px 2px 10px #333;
        background-color: white;
        position: absolute;
        top: 70px;
        right: 10px;
        z-index: 1000;
        overflow: hidden;
        transition-duration: .5s;
        border-radius: 5px;
        width: 200px;

        .setting-nav {
            margin-bottom: 20px;

            @extend .setting-nav
        }

        &[status='open'] {
            height: 200px;

        }

        &[status="close"] {
            height: 0;

            * {
                visibility: hidden;
            }
        }

        &>div {
            padding: 10px;
        }

        ul {
            list-style: none;
            width: 100%;

            li {
                padding: 5px 0;
                width: 100%;
                font-size: 14px;
                text-transform: capitalize;
                font-weight: 600;
                font-family: Arial, Helvetica, sans-serif;
                transition-duration: .5s;
                width: 100%;

                * {
                    text-decoration: none;
                }

                svg {
                    margin-right: 10px;
                    font-size: 16px;
                }

                &:last-child {
                    * {
                        color: red;
                    }
                }

                &:hover {
                    padding-left: 10px;
                }
            }
        }
    }

    .student-pages-header {
        * {
            padding: 0;
            margin: 0;
        }

        background-color: white;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 60px;
        padding: 0;

        ul {
            margin-left: 4%;
            list-style: none;
            display: flex;
            gap: 10px;

            li {
                padding: 0 10px;
                height: 60px;
                font-size: 17px;
                font-weight: bold;

                &.active {
                    border-bottom: 3px solid $main-color;

                    * {
                        color: $main-color;
                    }
                }

                &:hover * {
                    color: $main-color;
                }

                svg {
                    font-size: 20px;
                }

                * {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: #333;
                    gap: 10px;
                }

                .router-link {
                    height: 60px;
                }
            }
        }
    }
}
</style>
