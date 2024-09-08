<template>
    <section id="main-section">
        <header class="main-header">

        </header>
        <section class="content-section">
            <img :src="course.courseImg" alt="">
            <!-- <video v-for="video in course.videos" :key="video" :src="video" controls></video> -->
        </section>
        <footer class="main-footer">

        </footer>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    name: 'CourseView',
    data: () => {
        return {
            course : ''
        }
    },
    mounted() {
        console.log(this.$route.params.courseName)
        axios.get(`http://localhost:8081/Ncourse/course/${this.$route.params.courseName}`)
            .then(res => {
                res.data.courseImg = this.imagePath(res.data.courseImg)
                console.log(res.data.videos)
                this.course = res.data
                console.log(this.course)
            })
    },
    methods:{
        imagePath(imageName){
            return require(`@/assets/imagesUploaded/${imageName}`)
        }
    }
}
</script>
<style lang="scss" scoped>
$main-color: #0099ff;
$title-color: black;
$paragrph-color: #666;
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#main-section{
    width: 100%;

    .main-header{
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        background-color: $main-color;
    }
    .content-section{
        position: absolute;
        top: 50px;
        width: 100%;
        height: calc(100% - 50px);
        img{
            width: 100px;
            height: 100px;
        }
        video{
            width: 500px;
        }
    }
    .main-footer{
        width: 100%;
        height: 100px;
        background-color: #666;
        position: absolute;
        top: 100%;
    }
}

</style>