<template>
  <div class="instructor">
    <router-link :to="`/course/${name}?ID=${course_id}`" class="instructorRouter">
      <div class="instructorImg">
        <img :src="img" alt="">
      </div>
      <div class="instructorDetails">
        <div class="provider-div">
          <img :src="provider_logo" alt="">
          <p>{{ provider }}</p>
        </div>
        <h2>{{ name }}</h2>
        <p class="description-p">{{ description }}</p>
        <!-- <p class="department-p">{{ department }}</p> -->
        <div class="last-info">
          <p class="course-rate"><font-awesome-icon icon="fa-solid fa-star" />0</p>
          <p>{{ price }}$</p>
          <p>{{ hours }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: ['course_id', 'name', 'img', 'description', 'department', 'hours', 'language', 'price', 'instructor', 'provider', 'provider_logo'],
  name: 'COURSE',
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" >
.instructor {
  width: 325px;
  height: 400px;
  transition: .5s;
  margin: 10px 10px;
  border: 3px solid #eee;
  border-radius: 10px;
  animation-name: leftShift;
  animation-duration: 1s;
  background-color: white;

  .instructorRouter {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50% auto;
    text-decoration: none;

    .instructorImg {
      border-radius: 10px;
      position: relative;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .instructorDetails {
      text-align: left;
      border-radius: 10px;
      padding: 10px;
      position: relative;
      width: 100%;
      .provider-div{
        display: flex;
        align-items: center;
        img{
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .last-info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 10px;
        p{
          font-size: 1vw;
          font-weight: 600;
          color: #333;
        }
        svg{
          color: yellow;
        }

      }
      h2 {
        font-family: italicFont;
        color: #525FE1;
        padding-top: 10px;
      }

      p {
        padding-top: 10px;
        text-transform: capitalize;
        font-size: 1.2vw;
        margin: 0px 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
        line-height: 30px;
      }
      p.description-p{
        font-size: 1vw;
        height: 70px;
        width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
      }
    }
  }

  &:hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.295);
    transform: scale(1.02);
  }
}
</style>