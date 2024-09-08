import { createRouter, createWebHistory } from 'vue-router'
import signInDashBoard from '../components/signInDashBoard.vue'
import logInDashBoard from '../components/logInDashBoard.vue'
import ForgetPassword from '../components/ForgetPassword.vue'
import ValidationCode from '../components/ValidationCode.vue'  
import AllInfo from '@/components/AllInfo.vue'
import AddTeacher from '@/components/AddTeacher.vue'
import AddDepartment from '@/components/AddDepartment.vue'
import AllCourse from '@/components/AllCourses.vue'
import AddCourse from  '@/components/AddCourse.vue'
import AddAdmin from '@/components/AddAdmin.vue'
import AllStudents from "@/components/AdminComponents/AllStudent.vue"
import CourseContent from '@/components/AdminComponents/CourseContent.vue'
// home components
import HomeComponent from '@/components/HomeComponents/HomeComponent.vue'
import HomeCourseInfo from '@/components/HomeComponents/CourseInfo.vue'
// student components
import StudentHome from '@/components/StudentComponents/StudentHome.vue'
import StudentSetting from '@/components/StudentComponents/SettingComponent.vue'
import CourseInfo from '@/components/StudentComponents/CourseInfo.vue'
import MyLearning from '@/components/StudentComponents/MyLearning.vue'
import MyLearningCourse from '@/components/StudentComponents/MyLearningCourse.vue'

import LoginView from '../views/LoginView.vue'
import StudentView from '../views/StudentView.vue'
import HomeView from "../views/HomeView.vue"       
import Admin from "../views/Admin.vue"   
import TeacherView from '../views/TeacherView'
import CourseView from '../views/CourseView.vue'
const routes = [
  {
    path: '/',
    name:'home',
    component: HomeView,
    children : [
      {
        path: '/',
        component: HomeComponent
      },
      {
        path : 'course/:courseName',
        component : HomeCourseInfo
      }
    ]
    
  },
  {
    path: '/register',
    name:'register',
    component: LoginView
  },
  {
    path: '/signin',
    name: 'signin',
    component: signInDashBoard  
  },
  {
    path: '/login',
    name: 'loginDashBoard',
    component: logInDashBoard
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: ForgetPassword
  },
  {
    path: '/validationCode',
    name : 'validationCode',
    component:ValidationCode
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    children:[
      {
        path: 'dashboard/AllInfo',
        component: AllInfo
      },
      {
        path: 'teachers/addTeacher',
        component: AddTeacher
      },
      {
        path: 'departments/addDepartment',
        component: AddDepartment
      },
      {
        path: 'courses',
        component: AllCourse
      },
      {
        path: 'courses/AddCourse',
        component: AddCourse
      },
      {
        path: 'courses/CourseContent/:courseName',
        component: CourseContent
      },
      {
        path: 'admin/addAdmin',
        component: AddAdmin
      },
      {
        path: 'Students',
        component: AllStudents
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    component: StudentView,
    children: [
      {
        path: '/student',
        component: StudentHome
      },
      {
        path : 'setting',
        component: StudentSetting
      },
      {
        path : 'course/:courseName',
        component: CourseInfo
      },
      {
        path : 'myLearning',
        component : MyLearning,
      },
      {
        path : 'myLearning/:courseName',
        component : MyLearningCourse
      }
    ]
  },
  {
    path: "/Teacher",
    name: 'teacher',
    component: TeacherView
  },
  {
    path : '/Ncourse/course/:courseName',
    name: "CourseView",
    component : CourseView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
