<template>
    <section class='main-section'>
        <form action="" method="dialog" @submit="send_course_data">
            <div class="add-data-div">
                <input type="text" placeholder="name" v-model="new_course_data.name" required>
                <input type="text" placeholder="instructor" v-model="new_course_data.instructor_name" required>
                <input type="text" placeholder="department" v-model="new_course_data.department" required>
                <input type="number" placeholder="price" v-model="new_course_data.price" required>
                <input type="number" placeholder="hours" v-model="course_weeks" required @change="changeHeight">
                <input type="text" placeholder="descrition" v-model="new_course_data.description" required>
                <!-- provider logo -->
                <div>
                    <label for="provider-logo" class="provider-logo">
                        <input type="file" name="" id="provider-logo" style="display: none;" @change="upload_provider_logo"
                            >
                        <font-awesome-icon icon="fa-solid fa-building" />
                        <p>choose logo for provider</p>
                    </label>
                    <input type="text" name="" id="provider-input" placeholder="provider-name"
                        v-model="new_course_data.provider_name" required>
                </div>
                <!-- image and video course -->
                <div>
                    <label for="main-image" class="upload-label">
                        <input type="file" name="" id="main-image" style="display: none;" @change="show_main_image"
                            >
                        <font-awesome-icon icon="fa-solid fa-image" />
                        <h3>upload a files</h3>
                        <p>choose an image for this course</p>
                    </label>
                    <label for="course-videos" class="upload-label">
                        <input type="file" name="" id="course-videos" style="display: none;" @change="show_videos" multiple
                            >
                        <font-awesome-icon icon="fa-solid fa-film" />
                        <h3>upload a files</h3>
                        <p>choose a videoes for this course</p>
                    </label>
                </div>
                <!-- submit button -->
                <input type="submit" value="Add Course" class="add-course-button button">
                <input type="reset" value="reset all values" class="reset-button button">
            </div>
            <div class="course-content">
                <div v-for="(weeks, index) in course_weeks" :key="weeks" class="weeks-div">
                    <nav>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="weeks-div-arrow" />
                        <input type="text" placeholder="week title" v-model="new_course_data.courseWeeks[index].mainTitle">
                        <font-awesome-icon icon="fa-solid fa-sliders" />
                    </nav>
                    <nav>
                        <input type="text" name="" id="" placeholder="this week description" v-model="new_course_data.courseWeeks[index].description">
                        <ul class="willLearnList">
                            <li><input type="text" name="" id="" placeholder="what will learn" v-model="new_course_data.courseWeeks[index].willLearn[0]"></li>
                            <li><input type="text" name="" id="" placeholder="what will learn" v-model="new_course_data.courseWeeks[index].willLearn[1]"></li>
                        </ul>
                    </nav>
                    <div class="secondary-title-div" v-for="(secondaryTitle,secondIndex) in secondaryTitleCount" :key="secondaryTitle">
                        <nav class="secondaryTitle">
                            <font-awesome-icon icon="fa-solid fa-angle-right" class="secondary-div-arrow" />
                            <input type="text" placeholder="secondary title" v-model="new_course_data.courseWeeks[index].secondaryTitles[secondIndex].title">
                            <button @click="secondaryTitleCount += 1">
                                +
                            </button>
                        </nav>
                        <nav>
                            <input type="text" placeholder="description" v-model="new_course_data.courseWeeks[index].secondaryTitles[secondIndex].description">
                            <input type="file" name="" id="videos" multiple>
                        </nav>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    name: 'AddCourse',
    data: function () {
        return {
            provider_logo: null,
            main_image: null,
            secondaryTitleCount: 1,
            course_weeks: 1,
            new_course_data: {
                name: 'course name',
                instructor_name: 'instructor',
                department: 'department',
                price: 'price',
                description: 'description',
                provider_name: 'provider name',

                courseWeeks: [{
                    mainTitle: '',
                    description: '',
                    willLearn: [],
                    secondaryTitles: [{
                        title: '',
                        description: '',
                        status: '',
                        videos: [{
                            videos: '',
                            videosName: '',
                            videosStatus: '',
                            videosContentAsString: '',
                            files: []
                        }]
                    }]
                }]
            },
            course_image_file: '',
            provider_logo_file: '',
        }
    },
    mounted() {
        this.changeHeight()
        this.changeSecondTitleHeight()
    },
    methods: {
        upload_provider_logo(event) {
            let FR = new FileReader()
            FR.onload = () => {
                this.provider_logo = FR.result
            }
            FR.readAsDataURL(event.target.files[0])
            this.provider_logo_file = event.target.files[0]
        },
        show_main_image(event) {
            let fr = new FileReader()
            fr.onload = () => {
                this.main_image = fr.result
            }
            fr.readAsDataURL(event.target.files[0])
            this.course_image_file = event.target.files[0]
        },
        send_course_data() {
            let formData = new FormData();
            formData.append('provider_logo', this.provider_logo_file)
            formData.append('course_image', this.course_image_file)
            let videos_input = document.querySelector("#course-videos").files
            for (let i = 0; i < videos_input.length; i++) {
                formData.append('course_videos', videos_input[i])
            }
            formData.append("new_course_data", JSON.stringify(this.new_course_data))
            console.log(this.new_course_data)
            axios.post('http://localhost:8081/Admin/courses/AddCourse', formData)
                .then(res => {
                    if (res.data.status === true) {
                        this.$router.push({ path: '/Admin/courses' })
                    } else {
                        console.log("add course falied")
                    }
                })
        },
        changeHeight() {
            let expandArrow = document.querySelectorAll('.weeks-div-arrow')
            let weeksDiv = document.querySelectorAll('.weeks-div')
            expandArrow.forEach((element, index) => {
                element.addEventListener('click', () => {
                    weeksDiv[index].classList.toggle('opened')
                })
            });
            // const object = {
            //     mainTitle: '',
            //     description: '',
            //     willLearn: [],
            //     secondaryTitles: [{
            //         title: '',
            //         description: '',
            //         status: '',
            //         videos: [{
            //             videos: '',
            //             videosName: '',
            //             videosStatus: '',
            //             videosContentAsString: '',
            //             files: []
            //         }]
            //     }]
            // }
            // for (let i = 0; i < this.course_weeks; i++) {
            //     this.new_course_data.courseWeeks.push(object)
            // }
            // console.log(this.new_course_data.courseWeeks)
        },
        changeSecondTitleHeight() {
            let expandArrow = document.querySelectorAll('.secondary-div-arrow')
            let secondaryTitleDiv = document.querySelectorAll('.secondary-title-div')
            expandArrow.forEach((element, index) => {
                element.addEventListener('click', () => {
                    secondaryTitleDiv[index].classList.toggle('opened')
                })
            });
        },
        addSecondaryTitle() {

        }
    }
}
</script>
<style lang="scss" scoped>
$secondry-color : #0800FA;

.main-section {
    margin-top: 40px;

    form {
        padding: 20px;
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        gap: 20px;

        .add-data-div {
            width: 50%;

            input:not(input[type="submit"], input[type="reset"]) {
                width: 100%;
                height: 35px;
                margin-bottom: 10px;
                padding-left: 10px;
                text-transform: capitalize;

                &#provider-input {
                    margin-left: 10px;
                }
            }

            .button {
                width: 20%;
                margin: 20px 10px;
                border: none;
                background-color: greenyellow;
                padding: 10px 15px;
                font-weight: 800;
                font-family: Arial, Helvetica, sans-serif;
                cursor: pointer;
                border-radius: 10px;
                color: white;

            }


            div {
                width: 100%;
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;

                label {
                    border: 3px dashed $secondry-color;
                    cursor: pointer;
                    text-align: center;
                    font-family: Arial, Helvetica, sans-serif;
                    border-radius: 10px;

                    svg {
                        color: $secondry-color;
                    }
                }

                label.provider-logo {
                    width: 30%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    svg {
                        font-size: 25px;
                    }

                    p {
                        width: 50%;
                        font-size: 10px;
                        font-weight: 800;
                    }
                }

                label.upload-label {
                    width: 48%;
                    height: 100px;
                    padding: 10px 0;
                    font-size: 15px;

                    svg {
                        font-size: 35px;
                        margin-bottom: 5px;
                    }
                }
            }
        }

        .course-content {
            width: 50%;
            height: 90%;
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            overflow-y: auto;

            .weeks-div {
                border: 2px solid #666;
                border-radius: 10px;
                margin-bottom: 10px;
                height: 40px;
                overflow: hidden;

                &.opened {
                    height: 100%;

                    .weeks-div-arrow {
                        transform: rotate(90deg);
                    }
                }

                nav:nth-child(1) {

                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 10px;

                    &:hover {
                        input {
                            background-color: #eee;
                        }

                        background-color: #eee;
                    }

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        font-size: 15px;
                        color: black;
                        font-family: Arial, Helvetica, sans-serif;
                        text-transform: capitalize;
                    }

                    svg {
                        margin-right: 10px;
                        color: #333;
                        font-size: 20px;
                    }
                }
            }

            nav:nth-child(2) {
                display: block;
                padding: 0 10px;

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 15px;
                    color: black;
                    font-family: Arial, Helvetica, sans-serif;
                    text-transform: capitalize;
                    padding: 5px 10px;

                    &:focus {
                        border-right: 3px solid $secondry-color;
                    }
                }

                ul {
                    padding-left: 20px;
                }
            }

            .secondary-title-div {
                width: calc(100% - 60px);
                margin: 20px 30px;
                border: 2px solid #666;
                border-radius: 10px;
                height: 40px;
                overflow: hidden;

                &.opened {
                    height: fit-content;

                    svg {
                        transform: rotate(90deg);
                    }
                }

                .secondaryTitle {
                    width: calc(100% - 60px);
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 10px;

                    &:hover {
                        input {
                            background-color: #eee;
                        }

                        background-color: #eee;
                    }

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        font-size: 15px;
                        color: black;
                        font-family: Arial, Helvetica, sans-serif;
                        text-transform: capitalize;
                    }

                    svg {
                        margin-right: 10px;
                        color: #333;
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>