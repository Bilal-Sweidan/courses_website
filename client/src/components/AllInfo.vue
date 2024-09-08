<template>
    <section>
        <div id="allcards">
            <div class="studentsCard  card">
                <div>
                    <img src="../assets/students.png" alt="">
                    <div>
                        <h3>new students</h3>
                        <p>{{ totalStudentsCount }}</p>
                    </div>
                </div>
                <div>
                    <font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
                    <p>10% Higher Then Last Month</p>
                </div>
            </div>

            <div class="studentsCard  card">
                <div>
                    <img src="../assets/course.png" alt="">
                    <div>
                        <h3>total courses</h3>
                        <p>{{ totalCoursesCount }}</p>
                    </div>
                </div>
                <div>
                    <font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
                    <p>10% Higher Then Last Month</p>
                </div>
            </div>

            <div class="studentsCard  card">
                <div>
                    <img src="../assets/teacher.png" alt="">
                    <div>
                        <h3>total teacher</h3>
                        <p>{{ totalTeachersCount }}</p>
                    </div>
                </div>
                <div>
                    <font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
                    <p>10% Higher Then Last Month</p>
                </div>
            </div>

            <div class="studentsCard  card">
                <div>
                    <img src="../assets/collection.png" alt="">
                    <div>
                        <h3>free collection</h3>
                        <p>400</p>
                    </div>
                </div>
                <div>
                    <font-awesome-icon icon="fa-solid fa-arrow-trend-up" />
                    <p>10% Higher Then Last Month</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default{
    name: 'AllInfo',
    data: function(){
        return{
            totalStudentsCount: '',
            totalTeachersCount: '',
            totalCoursesCount: '',
        }
    },
    mounted(){
        axios.get('http://localhost:8081/Admin/dashboard/AllInfo')
        .then(res => {
            this.totalStudentsCount = res.data.studentsLength
            this.totalTeachersCount = res.data.teachersLength
            this.totalCoursesCount = res.data.coursesLength
        })
    }
}
</script>
<style lang="scss" scoped>
#allcards{
    width: 96%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 20px;
    margin: 50px 20px ;
    .card{
        padding: 10px 20px;
        background-color: #1b2131;
        color: #eee;
        border-radius: 5px;
        box-shadow: 1px 1px 5px white;
        text-transform: capitalize;
        font-family: Arial, Helvetica, sans-serif;
        div{
            display: flex;
            justify-content: space-between;
        }
        div:first-child{
            margin-bottom: 40px;
            div{
                display: inline-block;
                text-align: right;
                p{
                    font-size: 1.8vw;
                    margin-top: 10px;
                    color: rgb(78, 161, 78);
                }
            }
        }
    }
}
</style>