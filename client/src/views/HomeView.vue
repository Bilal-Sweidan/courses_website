<template>
  <section id="home">
    <header>
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
          <li id="homeLink">home</li>
          <li id="pageLink">
            pages<font-awesome-icon icon="fa-solid fa-angle-down" class="pageArrow" />
            <div id="pagePrompt">
              <div id="contentPagePrompt">
                <div id="pages">
                  <h5>Browse Overview</h5>
                  <div id="links">
                    <ul>
                      <li><font-awesome-icon icon="fa-solid fa-address-card" class="pageIcons" />about ust</li>
                      <li><font-awesome-icon icon="fa-solid fa-person-chalkboard" class="pageIcons" /><a href="#instructorsSlideBar">instructor</a></li>
                      <li><font-awesome-icon icon="fa-solid fa-lightbulb" class="pageIcons" />membership</li>
                      <li><font-awesome-icon icon="fa-solid fa-compass" class="pageIcons" />single instructor</li>
                      <li><font-awesome-icon icon="fa-solid fa-message" class="pageIcons" />FAG</li>
                      <li><font-awesome-icon icon="fa-solid fa-umbrella" class="pageIcons" />become instructor</li>
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
      <nav>
        <nav>
          <ul>
            <li id="login"><router-link to="/signin"><font-awesome-icon icon="fa-solid fa-bookmark" /> log
                in</router-link>
            </li>
            <li id="signUp"><router-link to="/login">sign up</router-link></li>
          </ul>
        </nav>
      </nav>
    </header>

    <router-view />
  </section>

</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style lang="scss" >
@font-face {
  font-family: italicFont;
  src: url(../fonts/RobotoCondensed-Italic.ttf);
}

$main-color: #0099ff;
$title-color: black;
$paragrph-color: #666;

#home {
  width: 100%;
  -webkit-user-select: none;
  user-select: none;
  scroll-behavior: smooth;
  #logo {
    display: flex;
    align-items: end;

    .graduationIcon {
      color: $main-color;
      font-size: 50px;
    }

    p {
      font-size: 2vw;
      font-weight: bold;
      text-transform: capitalize;
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: -3px;
      text-shadow: 1px 1px 7px #666;
    }
  }

  header {
    width: 100%;
    padding: 10px 40px ;
    display: flex;
    align-items: end;
    justify-content: space-between;

    ul {
      list-style: none;
      display: flex;
      align-content: center;
      justify-content: space-between;

      li {
        margin-right: 10px;
        font-size: 17px;
        font-family: Arial, Helvetica, sans-serif;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        justify-content: center;
        svg{
          margin-left: 5px;
          font-size: 15px;
        }
        &:hover {
          cursor: pointer;
        }
      }

      #login *,
      #signUp * {
        text-decoration: none;
      }

      #signUp {
        text-decoration: none;
        background-color: #525FE1;
        padding: 10px;
        border-radius: 7px;

        &:hover {
          background-color: rgb(3, 3, 83);
        }

        * {
          color: white;
        }
      }
    }
  }

  #blogPrompt,
  #coursePrompt {
    display: none;
    position: absolute;
    width: 250px;
    top: 60px;
    background-color: rgba(255, 255, 255, 0.774);
    animation-name: shifting;
    animation-duration: 1s;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.498);

    ul {
      display: inline-block;

      li {
        font-size: 15px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 10px;
        letter-spacing: 1px;
        transition-duration: .5s;

        &:hover {
          transform: scaleX(1.1);
        }
      }

    }

  }

  #blogPrompt {
    left: 63.5%;
  }

  #coursePrompt {
    left: 57.5%;
  }

  #blogLink:hover {
    #blogPrompt {
      display: block;
    }

    .blogArrow {
      transform: rotate(180deg);
      transition: .5s;
    }
  }

  #courseLink:hover {
    #coursePrompt {
      display: block;
    }

    .courseArrow {
      transform: rotate(180deg);
      transition: .5s;
    }
  }

  #pagePrompt {
    display: none;
    width: 80%;
    position: absolute;
    left: 10%;
    top: 60px;
    background-color: rgba(255, 255, 255, 0.913);
    animation-name: shifting;
    animation-duration: .5s;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.498);
    z-index: 1000;
    cursor: default;
    #contentPagePrompt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      #pages {
        margin: 10px;
        width: 50%;
        padding: 20px;
        #links {
          margin-top: 20px;
          ul {
            display: grid;
            grid-template-columns: 50% 50%;

            li {
              padding: 20px;
              border-bottom: 1px solid #eee;
              display: flex;
              justify-content: flex-start;
              a{
                text-decoration: none;
                color: black;
              }
              .pageIcons {
                font-size: 30px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

  #pageLink:hover {
    #pagePrompt {
      display: block;
    }

    .pageArrow {
      transform: rotate(180deg);
      transition: .5s;
    }
  }

  #homeLink {
    background-color: #525FE1;
    padding: 0px 10px;
    border-radius: 7px;
    a{
      color: white;
      text-decoration: none;
    }
  }

  #searchLabal {
    border: 2px solid #666;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      border: none;
      outline: none;
      font-size: 15px;
      margin-left: 10px;
    }
  }

  #homeContent div:first-child {
    display: flex;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100vh - 70px);

    #intro {
      width: 40%;
      height: fit-content;
      margin: 100px 50px;
      display: block;
      animation-duration: 1s;

      #introText {
        height: 250px;
        position: relative;

        span:first-child {
          color: #525FE1;
          font-size: 40px;
          font-family: italicFont;
          text-shadow: 1px 1px 3px blue
        }

        #introParagraph {
          opacity: 0;
          transition: 2s;
          font-size: 25px;
          text-shadow: 1px 1px 2px #666;
        }
      }

      p {
        font-size: 20px;
        text-transform: capitalize;
        color: #666;
        line-height: 50px;
      }

      #countMembers {
        width: fit-content;
        display: grid;
        grid-template-columns: repeat(3, 150px);
        gap: 20px;

        .member {
          height: 100px;
          background-color: rgb(253, 253, 253);
          margin: 20% 0;
          display: inline-block;
          text-align: center;
          padding-top: 25%;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.498);
          transition-duration: .5s;

          svg {
            font-size: 200%;
          }

          P {
            display: flex;
            align-items: center;
            justify-content: space-around;

          }

          &:hover {
            transform: scale(1.1);
          }
        }

      }
    }

    #introImg {
      width: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .svgWaves {
      position: absolute;
      bottom: 00vh;
      z-index: -1;
    }
  }

  #features {
    height: 80vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .details {
      background-color: #eeeeeeab;
      width: 100%;
      height: 80%;
      padding: 50px 30px; 
      display: grid;
      grid-template-columns: repeat(3, calc(100%/3));
      grid-template-rows: calc(100%/3);

      #mainDetail {
        grid-row: 1 / 4;
        padding: 30px 20px;
        text-shadow: 1px 1px 1px #464646;

        p {
          width: 20em;
          color: rgba(0, 0, 0, 0.676);
          font-size: 20px;
          text-transform: capitalize;
          line-height: 40px;

          span {
            color: orangered;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 30px;
            font-weight: 100;
          }
        }
      }

      .hidden {
        opacity: 0;
        transition: all 2s;
        margin-left: -300px;

      }

      .show {
        opacity: 1;
        margin-left: 0px;
      }

      .detailsDiv {
        display: grid;
        grid-template-columns: 8% auto;
        line-height: 30px;
        width: fit-content;

        h2 {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 100;
          color: orangered;
        }

        p {
          width: 25em;
          color: rgba(0, 0, 0, 0.676);
        }

        .detailsDivText {
          margin-left: 10px;
          text-shadow: 1px 1px 1px #464646;
        }
      }
    }
  }


  #coursesSection,
  #instructorSection {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .next,
    .previous {
      font-size: 40px;
      position: absolute;
      padding: 10px 5px;
      border-radius: 10px;
      cursor: pointer;
    }

    .next {
      right: 3%;

      &:hover {
        background-color: #33333386;
      }
    }

    .previous {
      display: none;
      left: 3%;

      &:hover {
        background-color: #33333386;
      }
    }

    #courses {
      width: 100%;
      height: 90%;
      #slideBar {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        margin-top: 30px;
        border-radius: 15px;
      }
      .show-more{
        margin-left: 80px;
        margin-top: 30px;
        width: 10%;
        height: 40px;
        text-transform: capitalize;
        border: 2px solid $main-color;
        background-color: white;
        border-radius: 7px;
        font-weight: 600;
        cursor: pointer;
        transition-duration: .5s;
        &:hover{
          background-color: #0099ff40;
        }
      }

      #coursesTitle {
        overflow-y: hidden;
        line-height: 30px;
        text-align: left;
        margin-left: 60px;

        h1 {
          color: #525FE1;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 2vw;
          text-transform: capitalize;
        }

        p {
          font-size: 1.5vw;
          text-transform: capitalize;
          color: #333;
          padding-left: 20px;
          font-family: Arial, Helvetica, sans-serif;

        }
      }
    }
  }
  #instructorSection {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .next,
    .previous {
      font-size: 40px;
      position: absolute;
      padding: 10px 5px;
      border-radius: 10px;
      cursor: pointer;
    }

    .next {
      right: 3%;

      &:hover {
        background-color: #33333386;
      }
    }

    .previous {
      display: none;
      left: 3%;

      &:hover {
        background-color: #33333386;
      }
    }

    #instructors {
      width: 90%;
      height: 90%;
      display: grid;
      grid-template-columns: repeat(4, auto);
      grid-template-rows: max-content .8fr;
      gap: 3%;
      text-align: center;

      #instructorsSlideBar {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        margin-top: 30px;
        grid-column: 1 / 6;
        // background-color: #eee;
        border-radius: 15px;

        .instructor {
          width: 350px;
          height: 400px;
          transition: .5s;
          margin: 10px 20px;
          border-width: 0 2px 2px 2px;
          border-style: solid;
          border-color: #eee;
          border-radius: 10px;
          box-shadow: none;
          animation-name: leftShift;
          animation-duration: 1s;

          .instructorRouter {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-rows: 50% auto;
            text-decoration: none;

            .instructorImg {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #525FE1;
              border-radius: 10px 10px 0 30px;

              img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 2px solid white;
              }

              &::after {
                content: '';
                position: relative;
                width: 40px;
                height: 40px;
                top: calc(50% + 20px);
                left: calc(103px - 45px);
                background-color: white;
                border-radius: 0 30px 0 0;
              }

              &::before {
                content: '';
                position: relative;
                width: 40px;
                height: 40px;
                top: calc(50% + 20px);
                left: calc(228px + 20px);
                background-color: #525FE1;
              }
            }



            .instructorDetails {
              text-align: center;
              background-color: white;
              border-radius: 10px;

              h2 {
                font-family: italicFont;
                color: #525FE1;
                padding-top: 10px;
              }

              p {
                padding-top: 10px;
                text-transform: capitalize;
                font-size: 1.2vw;
                margin: 5px 10px;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: 500;
                line-height: 30px;
              }
            }
          }

          &:hover {
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.671);
          }
        }

      }

      #instructorsTitle {
        grid-column: 1 / 6;
        line-height: 40px;

        h1 {
          color: var(--mainColor);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 2vw;
          text-transform: capitalize;
        }

        p {
          font-size: 2vw;
          text-transform: capitalize;
          color: #333;
          padding-left: 20px;

        }
      }
    }
  }

  footer {
    width: 100%;
    height: 300px;
    background-color: #eee;
  }
}



@keyframes shifting {
  from {
    opacity: 0;
    top: 80px;
  }
}

@keyframes leftShift {
  from {
    opacity: 0;
  }
}

@keyframes writingSlash {
  from {
    display: block;
  }

  to {
    display: none;
  }
}

// extra small screen
@media (max-width: 600px) {
  #infoNavBar {
    display: none;
  }
}

// small devices
@media (min-width: 600px) {
  #infoNavBar {
    display: none;
  }
}

// medium devices
@media (min-width: 768px) {
  #infoNavBar {
    display: none;
  }
}

// larg devices
@media (min-width: 992) {
  #infoNavBar {
    display: block;
  }
}

// extra larg screen
@media (min-width: 1200px) {
  #infoNavBar {
    display: block;
  }
}
</style>