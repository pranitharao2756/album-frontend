import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/albums",
    name: "albums",
    component: () => import("./views/TutorialsList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/view/:id",
    name: "viewargs",
    component: () => import("./views/ViewAlbum.vue"),
    props: true
  },
  {
    path: "/addTrack/:id",
    name: "addTrack",
    component: () => import("./views/AddTrack.vue"),
    props: true
  },
  {
    path: "/addArtist/:id",
    alias: "/addArtist",
    name: "addArtist",
    component: () => import("./views/AddArtist.vue")
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;