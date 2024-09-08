import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vue3dLoader from "vue-3d-loader";
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faGraduationCap,
  faSearch,
  faAngleDown,
  faBookmark,
  faPersonChalkboard,
  faAddressCard,
  faLightbulb,
  faCompass,
  faMessage,
  faUmbrella,
  faAngleRight,
  faAngleLeft,
  faAngleUp,
  faChartSimple,
  faUserTie,
  faPlus,
  faMinus,
  faUserGroup,
  faBookOpenReader,
  faBars,
  faLanguage,
  faBell,
  faExpand,
  faGear,
  faArrowRightFromBracket,
  faSliders,
  faArrowTrendUp,
  faPencil,
  faPuzzlePiece,
  faFileImport,
  faLock,
  fa1,
  faUpload,
  faChalkboardUser,
  faPeopleGroup,
  faUserGraduate,
  faCaretDown,
  faCartShopping,
  faHeadphones,
  faUser,
  faUserLock,
  faHouseChimney,
  faCloudArrowUp,
  faCamera,
  faVideo,
  faImage,
  faFilm,
  faBuilding,
  faInbox,
  faReplyAll,
  faEllipsisVertical,
  faXmark,
  faSchool,
  faCircleCheck,
  faToolbox,
  faFeather,
  faFileArrowUp,
  faHeading,
  faList,
  faForwardStep,
  faBackwardStep
  
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faSquare, faSquareCheck, faCircleLeft, faCircleRight, faStar,faMoon , faSun,  } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faGraduationCap,
  faSearch,
  faAngleDown,
  faBookmark,
  faPersonChalkboard,
  faAddressCard,
  faLightbulb,
  faCompass,
  faMessage,
  faUmbrella,
  faAngleRight,
  faAngleLeft,
  faChartSimple,
  faUserTie,
  faPlus,
  faMinus,
  faUserGroup,
  faBookOpenReader,
  faBars,
  faLanguage,
  faBell,
  faExpand,
  faEnvelope,
  faUser,
  faGear,
  faArrowRightFromBracket,
  faSliders,
  faArrowTrendUp,
  faPencil,
  faPuzzlePiece,
  faFileImport,
  faLock,
  fa1,
  faAngleUp,
  faSquare,
  faSquareCheck,
  faUpload,
  faChalkboardUser,
  faPeopleGroup,
  faUserGraduate,
  faCircleLeft,
  faCaretDown,
  faCartShopping,
  faHeadphones,
  faUserLock,
  faHouseChimney,
  faCircleRight,
  faCloudArrowUp,
  faCamera,
  faVideo,
  faImage,
  faFilm,
  faBuilding,
  faStar,
  faInbox,
  faReplyAll,
  faEllipsisVertical,
  faXmark,
  faSchool,
  faCircleCheck,
  faToolbox,
  faFileArrowUp,
  faHeading,
  faFeather,
  faMoon, 
  faSun,
  faList,
  faForwardStep,
  faBackwardStep
);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vue3dLoader)
  .mount("#app");


// <font-awesome-icon icon="fa-brands fa-battle-net" />