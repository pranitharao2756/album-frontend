import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/artists",
    name: "artists",
    component: () => import("./views/ArtistList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditArtist.vue"),
    props: true
  },
  {
    path: "/editAlbum/:artistid/:albumid",
    name: "editAlbum",
    component: () => import("./views/EditAlbum.vue")
  },
  {
    path: "/add/:id",
    name: "add",
    component: () => import("./views/AddAlbum.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewArtist.vue"),
    props: true
  },
  {
    path: "/view/:id",
    name: "viewargs",
    component: () => import("./views/ViewArtist.vue"),
    props: true
  },
  {
    path: "/viewalbum/:id",
    name: "viewalbum",
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
    path: "/addArtist",
    alias: "/addArtist",
    name: "addArtist",
    component: () => import("./views/AddArtist.vue")
  },
  {
    path: "/editTrack/:albumid/:trackid",
    name: "editTrack",
    component: () => import("./views/EditTrack.vue"),
    props: true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;