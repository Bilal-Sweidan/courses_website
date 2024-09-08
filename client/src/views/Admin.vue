<template>
    <section id="mainSection">
        <LoadingComponent v-if="isLoading"></LoadingComponent>
        <header>
            <div>
                <!-- <font-awesome-icon icon="fa-regular fa-circle-left" id="sidebar-button" @click="sidebar_Button" /> -->
                <font-awesome-icon icon="fa-solid fa-list" id="sidebar-button" @click="sidebar_Button"/>
                <div>
                    <font-awesome-icon icon="fa-solid fa-graduation-cap" class="graduationIcon" />
                    <h1>LMS</h1>
                </div>
            </div>
            <div>
                <nav class="mode-nav" @click="changePageMode">
                    <font-awesome-icon icon="fa-regular fa-moon" class="page-mode moon active" />
                    <font-awesome-icon icon="fa-regular fa-sun" class="page-mode sun "/>
                </nav>
                <ul>
                    <li>get help</li>
                    <li>fourm</li>
                </ul>
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                <font-awesome-icon icon="fa-solid fa-bell" />
                <div class="user" @click="user_list">
                    <img :src="user_image" alt="">
                    <font-awesome-icon icon="fa-solid fa-caret-down" class="user-list-icon" />
                </div>
                <div class="user-list" user-list-state="close">
                    <ul>
                        <li>accout</li>
                        <li>inbox</li>
                        <router-link to="/signin" @click="logOut">
                            <li>log out</li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </header>
        <!-- all page without the header -->
        <section id="second-section">
            <!-- sidebar -->
            <div id="sidebar" sidebar-state="close">
                <!-- <div class="feedback-div">
                    <p>application feedback</p>
                    <ul>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li state="selected">full feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                </div> -->
                <!-- dashboard -->
                <div class="courses-div sidebar-lists">
                    <p id="category-title">application</p>
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user-tie" />
                            <p>dashboard</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>dashboard 1</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>dashboard 2</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>dashboard 3</li>
                        </router-link>
                    </ul>
                    <!-- teahcer tap -->
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user-tie" />
                            <p>teachers</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/teachers/addTeacher">
                            <li>add teacher</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                    <!-- students tap -->
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user" />
                            <p>students</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/Students">
                            <li>all students</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                    <!-- courses tap -->
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-headphones" />
                            <p>courses</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/courses">
                            <li>courses</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                    <!-- library tap -->
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-book-open-reader" />
                            <p>library</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/departments/addDepartment">
                            <li> add courses</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                    <!-- admin tap -->
                    <div class="category-button">
                        <div>
                            <font-awesome-icon icon="fa-solid fa-user-lock" />
                            <p>admin</p>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-caret-down" class="list-arrow" />
                    </div>
                    <ul class="category-list" state="close">
                        <router-link to="/Admin/admin/addAdmin">
                            <li>add admin</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>instructors feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>students feedback</li>
                        </router-link>
                        <router-link to="/Admin/dashboard/AllInfo">
                            <li>courses feedback</li>
                        </router-link>
                    </ul>
                </div>



            </div>
            <!-- end sidebar tags -->

            <!-- viewer -->
            <div id="viewer">
                <header class="path-header">
                    <font-awesome-icon icon="fa-solid fa-house-chimney" /> / {{ page_path }}
                </header>
                <router-view></router-view>
            </div>
            <!-- end viewer tags -->
        </section>
        <!-- end  -->
    </section>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true;
import LoadingComponent from '@/components/LoadingComponent.vue'
export default {
    name: "AdminView",
    data: function () {
        return {
            user_image: '',
            page_path: '',
            isLoading: true,
        }
    },
    components:{
        LoadingComponent
    },
    mounted() {
        // loading timer
        setTimeout(() => {
            this.isLoading = false
        }, 1500);

        // get admin details info 
        axios.get('http://localhost:8081/Admin')
            .then(res => {
                return res.data
            })
            .then(res => {
                if (res) {
                    this.imagePath(res.photo)
                    this.fullName = res.fullName
                } else {
                    console.log(res)
                    localStorage.clear()
                    this.$router.push({ path: '/signin' })
                }
            })
        // the of this method

        // selected window (feedback list) 
        let li_list = document.querySelectorAll('#sidebar ul li')
        for (let i = 0; i < li_list.length; i++) {
            li_list[i].addEventListener('click', () => {
                if (li_list[i].getAttribute('state') !== 'selected') {
                    li_list.forEach(e => {
                        e.setAttribute('state', '')
                    })
                    li_list[i].setAttribute('state', 'selected')
                }
                document.querySelector('#sidebar').setAttribute('sidebar-state', 'close')
            })
        }
        li_list.forEach(e => {
            e.addEventListener('click', () => {
                setTimeout(() => {
                    let page_path = this.$route.fullPath.split('/')
                    let filtered_path = page_path.slice(2)
                    this.page_path = filtered_path.join(' / ')
                }, 1)
            })
        })
        document.body.onload = () => {
            let page_path = this.$route.fullPath.split('/')
            let filtered_path = page_path.slice(2)
            this.page_path = filtered_path.join(' / ')

        }
        // selected list (category-button)
        let category_button = document.querySelectorAll('.category-button')
        let category_list = document.querySelectorAll('.category-list')
        let arrow_list = document.querySelectorAll('.list-arrow')
        for (let i = 0; i < category_button.length; i++) {
            category_button[i].addEventListener('click', () => {
                if (category_list[i].getAttribute('state') === 'close') {
                    category_list[i].setAttribute('state', 'open')
                    category_button[i].setAttribute('state', 'selected')
                    arrow_list[i].style.transform = 'rotate(0deg)'
                } else {
                    category_list[i].setAttribute('state', 'close')
                    category_button[i].setAttribute('state', '')
                    arrow_list[i].style.transform = 'rotate(-90deg)'
                }
            })
        }

        this.pageModeOnload()
    },
    methods: {
        sidebar_Button() {
            let sidebar = document.querySelector('#sidebar')
            let sidebar_Button = document.querySelector('#sidebar-button')
            if (sidebar.getAttribute('sidebar-state') === 'open') {
                sidebar.setAttribute('sidebar-state', 'close')
                sidebar_Button.style.transform = 'rotate(180deg)'
            } else {
                sidebar.setAttribute('sidebar-state', 'open')
                sidebar_Button.style.transform = 'rotate(0deg)'
            }
        },
        user_list() {
            let user_list = document.querySelector('.user-list')
            let user_list_icon = document.querySelector('.user-list-icon')
            if (user_list.getAttribute('user-list-state') === 'close') {
                user_list.setAttribute('user-list-state', 'open')
                user_list_icon.style.transform = "rotate(0deg)"
            } else {
                user_list_icon.style.transform = "rotate(-90deg)"
                user_list.setAttribute('user-list-state', 'close')
            }
        },
        imagePath(imageName) {
            if (imageName !== '') {
                this.user_image = require(`@/assets/imagesUploaded/${imageName}`);
            }
        },
        logOut(){
            axios.post('http://localhost:8081/logOut')
            localStorage.clear()
        },
        changePageMode(){
            let root = document.querySelector(':root')
            if(localStorage.pageMode == 'dark'){
                localStorage.pageMode = 'light';
                root.style.setProperty('--main-color','#39444d')
                root.style.setProperty('--blue-color','#2b9eea')
                root.style.setProperty('--side-bar-color','#39444d')
            }else{
                console.log(document.querySelector(':root'))
                localStorage.pageMode = 'dark';
                root.style.setProperty('--main-color','#212130')
                root.style.setProperty('--blue-color','#212130')
                root.style.setProperty('--side-bar-color','#212130')
            }
            let modeButton = document.querySelectorAll('.page-mode')
            modeButton.forEach(e => {
                e.classList.toggle('active')
            })
            location.reload();
        },
        pageModeOnload(){
            let root = document.querySelector(':root')
            if(localStorage.pageMode == 'light'){
                root.style.setProperty('--main-color','#39444d')
                root.style.setProperty('--blue-color','#2b9eea')
                root.style.setProperty('--side-bar-color','#39444d')
                document.querySelector('.sun').classList.toggle('active')
                document.querySelector('.moon').classList.toggle('active')
            }else if(localStorage.pageMode == undefined){
                localStorage.pageMode = 'light'
                root.style.setProperty('--main-color','#39444d')
                root.style.setProperty('--blue-color','#2b9eea')
                root.style.setProperty('--side-bar-color','#39444d')
                document.querySelector('.sun').classList.toggle('active')
                document.querySelector('.moon').classList.toggle('active')
            }else{
                root.style.setProperty('--main-color','#212130')
                root.style.setProperty('--blue-color','#212130')
                root.style.setProperty('--side-bar-color','#212130')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
// $dark-color: #212130;
// $dark-color-bg: #181820;
:root{
    --main-color: #39444d;
    --blue-color: #2b9eea;
    --side-bar-color: #39444d;
}
* {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#mainSection {
    header {
        user-select: none;
        position: absolute;
        width: 100%;
        height: 64px;
        background: var(--blue-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: white;
        // box-shadow: -1px -1px 30px white;
        div:first-child {
            display: flex;
            align-items: center;

            svg {
                color: var(--main-color);
                font-size: 30px;
                transition: 1s;
                color: #eee;
                transition: .2s;

                &:hover {
                    cursor: pointer;
                }
            }

            div {
                display: flex;
                align-items: center;
                margin-left: 20px;

                svg {
                    color: var(--main-color);
                    font-size: 40px;
                    color: #eee;
                }

                h1 {
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-size: 2vw;
                    margin-left: 10px;
                }
            }
        }

        div:last-child {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #eee;
            .mode-nav{
                width: fit-content;
                height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin-left: 25px;
                overflow: hidden;
                svg{
                    transition-duration: 1s;
                }
                svg.active{
                    font-size: 20px ;
                    margin: 0;
                    display: none;
                }
            }
            svg {
                font-size: 20px;
                margin-left: 25px;
            }

            ul {
                text-decoration: none;
                display: flex;
                list-style: none;

                li {
                    margin-left: 25px;
                    font-size: 18px;
                    text-transform: capitalize;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }
            }

            .user {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 25px;

                svg {
                    font-size: 15px;
                    margin-left: 10px;
                    transform: rotate(-90deg);
                }

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 25px;
                    background-color: white;
                }
            }

            * {
                transition: .2s;
            }

            *:not(ul):hover {
                cursor: pointer;
                color: white;
            }

            .user-list {
                position: relative;
                overflow-y: hidden;
                ul {
                    overflow: hidden;

                    * {
                        text-decoration: none;
                        color: #eee;
                    }
                }

                ul::before {
                    content: '';
                    position: absolute;
                    width: 3px;
                    height: 200%;
                    background-color: var(--blue-color);
                    left: 10px;
                    top: -50%;
                }
            }

            .user-list[user-list-state="close"] {
                display: none;
            }

            .user-list[user-list-state="open"] {
                display: block;
                animation-name: user-list;
                animation-duration: .5s;
            }
        }
    }

    // end header styling

    // second section
    #second-section {
        position: absolute;
        width: 100%;
        height: calc(100% - 64px);
        top: 64px;
        display: flex;

        #sidebar {
            height: 100%;
            background-color: var(--side-bar-color) !important;
            transition: .5s;
            overflow-y: auto;
            user-select: none;
            overflow-x: hidden;

            &[sidebar-state='open'] {
                width: 18%;
            }

            &[sidebar-state='close'] {
                width: 0;
            }


            // .feedback-div {
            //     padding: 10px 20px;
            //     width: max-content;
            //     height: 100px;
            //     margin-top: 30px;

            //     p {
            //         font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            //         text-transform: capitalize;
            //         color: white;
            //         letter-spacing: 1px;
            //     }
            //     ul {
            //         position: relative;
            //         list-style: none;
            //         font-family: Arial, Helvetica, sans-serif;
            //         padding: 0 10px;

            //         li {
            //             margin: 10px 20px;
            //             display: flex;
            //             align-items: center;

            //             &[state='selected']::after {
            //                 content: '';
            //                 width: 12px;
            //                 height: 12px;
            //                 border-radius: 50%;
            //                 position: absolute;
            //                 left: 5px;
            //                 background-color: var(--blue-color);
            //             }

            //             &:hover::after {
            //                 content: '';
            //                 width: 12px;
            //                 height: 12px;
            //                 border-radius: 50%;
            //                 position: absolute;
            //                 left: 5px;
            //                 background-color: #2b9eea9a;
            //             }
            //         }


            //         * {
            //             text-transform: capitalize;
            //             color: #eee;
            //             text-decoration: none;
            //             font-size: 95%;
            //         }

            //         &::before {
            //             content: '';
            //             position: absolute;
            //             width: 2px;
            //             height: 100%;
            //             background-color: #666;
            //         }
            //     }

            // }

            // sidebar-lists components
            %sidebar-lists {
                width: 100%;
                height: 100px;
                margin-top: 50px;
                #category-title {
                    padding: 10px 20px;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    text-transform: capitalize;
                    color: white;
                    letter-spacing: 1px;
                }

                ul {
                    position: relative;
                    list-style: none;
                    padding: 0px 30px;
                    background-color: rgba(38, 45, 51, .5);
                    overflow: hidden;
                    transition: 1s;

                    li {
                        margin: 15px 20px;
                        display: flex;
                        align-items: center;

                        &[state='selected']::after {
                            content: '';
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            position: absolute;
                            left: 25px;
                            background-color: var(--blue-color);
                        }

                        &:hover::after {
                            content: '';
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            position: absolute;
                            left: 25px;
                            background-color: #2b9eea9a;
                        }
                    }


                    * {
                        text-transform: capitalize;
                        color: #8a9299;
                        text-decoration: none;
                        font-size: 95%;
                    }

                    &::before {
                        content: '';
                        position: absolute;
                        width: 2px;
                        height: 100%;
                        top: 0;
                        background-color: rgba(46, 49, 51, .9);
                    }

                }

                ul[state="open"] {
                    // height: 150px;
                    height: auto;
                    transition: 1s;
                }

                ul[state="close"] {
                    height: 0px;
                }
            }

            .courses-div {
                @extend %sidebar-lists;
                .category-button {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 20px;
                    color: white;
                    div {
                        display: flex;
                        align-items: center;

                        svg {
                            font-size: 15px;
                            margin-right: 10px;
                            color: var(--blue-color);
                        }

                        p {
                            font-size: 17px;
                            text-transform: capitalize;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                    }

                    .list-arrow {
                        transition-duration: .5s;
                        font-size: 15px;
                        transform: rotate(-90deg);
                    }

                    &:hover {
                        cursor: pointer;
                        background-color: rgba(38, 45, 51, .5);
                    }
                    &[state="selected"] {
                        background-color: rgba(38, 45, 51, .5);
                    }
                }
            }
        }

        #viewer {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #eee;
            overflow-x: hidden;
            overflow-y: hidden;

            .path-header {
                width: 100%;
                height: 40px;
                background-color: #a8a8a8a1;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 15px;
                font-family: Arial, Helvetica, sans-serif;

                svg {
                    margin-right: 6px;
                }
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
    background-color: #666;
    border-radius: 20px;
}

@keyframes user-list {
    from {
        width: 0;
        opacity: 0;
    }

    to {
        opacity: 1;
        width: max-content;
    }
}</style>