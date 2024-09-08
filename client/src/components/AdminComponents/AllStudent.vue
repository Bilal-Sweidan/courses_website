<template>
    <section class="main-section">
        <section class="table-section">
            <div class="table-div-row" v-for="course in courses_data" :key="course"
                @click="show_course(course.courseName)" @mouseup="courseSetting">
                <ul class="section-rows">
                    <li class="checkbox"><font-awesome-icon icon="fa-regular fa-square" /></li>
                    <li class="name">{{ course.courseName }}</li>
                    <li>{{ course.category }}</li>
                    <li>{{ course.providerOrginization }}</li>
                    <li>{{ course.students.length }}</li>
                    <li>{{ course.instructor }}</li>
                    <li>{{ course.totalRate }}</li>
                    <li>{{ course.createdAt }}</li>
                    <li class="price">{{ course.price }} <span>$</span> </li>
                </ul>
            </div>

            <footer class="table-footer">
                <div class="more-courses-div">
                    <font-awesome-icon icon="fa-solid fa-backward-step" />
                    <font-awesome-icon icon="fa-solid fa-angle-left" title="next courses data" />
                    <font-awesome-icon icon="fa-solid fa-angle-right" title="back courses data" />
                    <font-awesome-icon icon="fa-solid fa-forward-step" />
                </div>
            </footer>
        </section>
    </section>
</template>
<script>
export default {
    name: 'AllStudents',

}
</script>
<style lang="scss" scoped>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.main-section {
    margin-top: 40px;
    padding: 20px;
    height: 100%;
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
            justify-content: flex-end;


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
}
</style>