<template>
    <div id="top-div">
        <header class="main-header">
            <input type="search" name="" id="">
        </header>
        <section class="main-section">
            <header class="table-header">
                <ul>
                    <li class="checkbox"><font-awesome-icon icon="fa-regular fa-square" /></li>
                    <li>name</li>
                    <li>department</li>
                    <li>provider</li>
                    <li>Students</li>
                    <li>instuctor</li>
                    <li>rate</li>
                    <li>adding data</li>
                    <li>price</li>
                </ul>
            </header>
            <section class="table-section">
                <div class="table-div-row" v-for="(course,index) in courses_data" :key="course"
                    @click="show_course(course.courseName)" @mouseup="courseSetting">
                    <ul class="section-rows">
                        <li class="checkbox" @click="selectRow(index)"><font-awesome-icon icon="fa-regular fa-square" class="squar checked"/><font-awesome-icon icon="fa-regular fa-square-check" class="squar " style="display: none"/></li>
                        <li class="name">{{ course.courseName }}</li>
                        <li>{{ course.category }}</li>
                        <li>{{ course.providerOrginization }}</li>
                        <li>{{ course.students.length }}</li>
                        <li>{{ course.instructor }}</li>
                        <li>{{ course.totalRate}}</li>
                        <li>{{ course.createdAt }}</li>
                        <li class="price">{{ course.price }} <span>$</span> </li>
                    </ul>
                </div>

                <footer class="table-footer">
                    <router-link to="/Admin/courses/AddCourse" class="add-course-button"><font-awesome-icon
                            icon="fa-solid fa-plus" />Add course</router-link>
                    <div class="more-courses-div">
                        <font-awesome-icon icon="fa-regular fa-circle-left" title="next courses data" />
                        <font-awesome-icon icon="fa-regular fa-circle-right" title="back courses data" />
                    </div>
                </footer>
            </section>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddCourse',
    data: function () {
        return {
            courses_data: []
        }
    },
    mounted() {
        // get all courses
        axios.get('http://localhost:8081/Admin/courses')
            .then(res => {
                console.log(res.data)
                this.courses_data = res.data
                res.data.forEach((e,index) => {
                    let sumRate = 0
                    e.rate.forEach(e => {
                        sumRate += e
                        console.log(e)
                    })
                    if(e.rate.length != 0 ){
                        this.courses_data[index]['totalRate'] = +sumRate/e.rate.length
                        console.log(e.rate.length)
                    }else{
                        this.courses_data[index]['totalRate'] = 0
                    }
                })

            })

            this.pageMode()
    },
    methods: {
        show_course(courseName) {
            // this.$router.push(`/Admin/Courses/CourseContent?ID=${course_id}`)
            this.$router.push(`/Admin/Courses/CourseContent/${courseName}`)
        },
        courseSetting(e){
            switch (e.button) {
                case 2:
                    console.log('done')
                    break;
            }
        },
        pageMode(){
            let root = document.querySelector(':root')
            if(localStorage.pageMode == 'dark'){
                root.style.setProperty('--main-color','#212130')
                root.style.setProperty('--bg-color','#181820')
            }else{
                root.style.setProperty('--main-color','#39444d')
                root.style.setProperty('--bg-color','#eee')
                
            }
        }
    },
    selectRow(index){
        let box = document.querySelectorAll('.squar')
        box[index].forEach((e) => {
            e.classList.toggle('checked')
        })
    }
}
</script>

<style lang="scss" scoped>

:root{
    --main-color: #39444d;
    --blue-color: #2b9eea;
    --secondry-color : #0800FA;
    --bg-color:  #eee;
    --table-bg-color: #212130;
    // --dark-color-bg: #181820;
}

#top-div {
    margin-top: 40px;
    width: 100%;
    padding: 20px;
    background-color: var(--bg-color);
    .main-section {
        width: 100%;
        margin-top: 20px;
        .table-header {
            padding: 10px 5px;
            color: white;
            font-size: 15px;
            transition-duration: 1s;
            background-color: var(--blue-color);
            border-radius: 10px 10px 0 0;
        }

        .table-section {
            height: 28.5em;
            position: relative;

            .table-div-row {
                height: calc((100% - 40px) /10);
                padding: 10px 5px;
                color: black;
                font-size: 15px;
                transition-duration: 1s;
                cursor: pointer;
                background-color: #acacac37;
                transition-duration: 0.5s;

                &:hover {
                    transform: scale(1.01);
                    box-shadow: 2px 2px 10px #666;
                    border: 4px solid var(--blue-color);
                    border-bottom: none;
                    border-top: none;
                    border-right: none;
                }
                li:nth-child(1){
                    svg{
                        display: none;
                        &.checked{
                            display: block
                        }
                    }
                }
            }

            .table-footer {
                position: absolute;
                bottom: -40px;
                width: 100%;
                height: 40px;
                background-color: var(--main-color);
                border-radius: 0 0 10px 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .add-course-button {
                    height: 40px;
                    border-radius: 0 0 0 10px;
                    font-family: Arial, Helvetica, sans-serif;
                    color: black;
                    font-weight: 700;
                    text-decoration: none;
                    background-color: var(--blue-color);
                    width: 15%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    text-transform: capitalize;
                    font-size: 15px;

                    svg {
                        margin-right: 10px;
                        font-weight: bold;
                        font-size: 20px;
                        transition-duration: .5s;
                    }

                    &:hover svg {
                        transform: scale(1.2);
                    }

                }

                .more-courses-div {
                    width: 7%;
                    height: 100%;
                    // background-color: red;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: white;
                    font-size: 20px;
                    padding: 0 10px;

                    svg {
                        cursor: pointer;
                        transition-duration: .5s;

                        &:hover {
                            transform: scale(1.1);
                        }
                    }

                }
            }
        }

        ul {
            list-style: none;
            display: flex;

            li {
                margin-right: 10px;
                text-transform: capitalize;
                font-family: Arial, Helvetica, sans-serif;

                &:not(&.checkbox) {
                    width: calc(100% / 8);
                    text-wrap: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-right: 30px;
                    // &:hover{
                    //     overflow: visible;
                    //     text-overflow: clip;
                    //     width: fit-content;
                    // }
                }

                &.checkbox {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 5px;

                    svg {
                        cursor: cell;
                    }
                }

                &.price {
                    display: flex;

                    // justify-content: space-between;
                    // padding-right: 80px;
                    span {
                        color: blue;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
}
</style>