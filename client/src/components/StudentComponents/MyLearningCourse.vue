<template>
    <section class="main-section">
        <section class="sidebar">
            <div>
                <img :src="courseData.courseImg" alt="">
                <p>{{ courseData.courseName }} course</p>
            </div>
            <div class="week-div">
                <router-link v-for="(week,index) in courseData.courseContent" :key="week" :to="'week'+(index + 1)">week {{ index + 1 }}</router-link>
            </div>
        </section>
        <section class="tip-content">

        </section>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    name: 'MyLearningCourse',
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
            axios.get(`http://localhost:8081/Student/myLearning/${this.$route.params.courseName}`)
                .then(res => {
                    let videos = res.data.videos
                    for (let i = 0; i < videos.length; i++) {
                        videos[i] = this.filePath(videos[i])
                    }
                    res.data.courseImg = this.filePath(res.data.courseImg)
                    this.courseData = res.data
                    console.log(this.courseData)

                    this.appendDataToPage()

                })
        },
        filePath(fileName) {
            return require(`@/assets/imagesUploaded/${fileName}`)
        },
        appendDataToPage() {
            console.log(this.courseData.courseContent[0]);
            let contener = document.querySelector('.tip-content')
            let dataa = this.courseData.courseContent[0]
            let videoIndex = 0;
            for (let i = 0; i < dataa.length; i++) {
                console.log(dataa[i][0].type)
                let h1Style = `
                    font-size: 30px;
                    font-family: 'titleFont';
                    margin-bottom: 20px;
                    text-transform: capitalize;
                    text-decoration: underline;
                `
                let h3Style = `
                    font-size: 25px;
                    font-family: 'secondTitle';
                    margin-bottom: 20px;
                    margin: 0 20px ;
                    text-transform: capitalize;
                `
                let videoStyle = `
                    margin: 50px 5%;
                    width: 90%;
                `
                let pStyle = `
                    margin: 10px 20px;
                    font-size: 18px;
                    text-transform: capitalize;
                    color: #333;
                    font-family: 'secondTitle';
                `
                switch (dataa[i][0].type) {
                    case 'h1':
                        contener.innerHTML += `<h1 style="${h1Style}">${dataa[i][0].text}</h1>`
                        break;
                    case 'h3':
                        contener.innerHTML += `<h3 style="${h3Style}">${dataa[i][0].text}</h3>`
                        break;
                    case 'p':
                        contener.innerHTML += `<p style="${pStyle}">${dataa[i][0].text}</p>`
                        break;
                    case 'video':
                            contener.innerHTML += `<video src="${this.courseData.videos[videoIndex]}"style="${videoStyle}" controls></video>`
                            videoIndex += 1
                        break;
                    default:
                        break;
                }

            }
        }
    }
}
</script>
<style lang="scss" scoped>
$main-color: #2b9eea;
@font-face {
    font-family: 'titleFont';
    src: url(@/fonts/RobotoCondensed-BoldItalic.ttf);
}
@font-face {
    font-family: 'secondTitle';
    src: url(@/fonts/RobotoCondensed-Italic.ttf);
}
@font-face {
    font-family: 'paragraph';
    src: url(@/fonts/RobotoCondensed-Light.ttf);
}
.main-section {
    position: absolute;
    display: flex;
    width: 100%;
    top: 70px;
    height: calc(100% - 70px);
    padding-top: 10px;
    .sidebar {
        width: 20%;
        background-color: #eee;
        div:nth-child(1){
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 10px;
            flex-wrap: wrap;
            img{ 
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
            p{
                font-size:  20px;
                font-weight: 600;
                text-transform: capitalize;
                color: $main-color;
                font-family: Arial, Helvetica, sans-serif;
                color: black;
            }
        }
        .week-div{
            margin-top: 10px;
            text-align: center;
            a{
                // color: white;
                text-align: center;
                text-decoration: none;
                text-transform: capitalize;
                font-size:  17px;
                font-family: Arial, Helvetica, sans-serif;
                background-color: #2b9eea2c;
                border: 2px solid #2b9eea2c;
                border-radius: 4px;
                padding: 10px 30%;
                cursor: pointer;
                transition-duration: .5s;
                &:hover{
                    background-color: #2b9eea2c;
                    border: 2px solid #2b9eea2c;
                }
            }
        }
    }
    .tip-content{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        overflow-y: auto;
        width: 80%;
        padding: 20px;
    }
}
</style>