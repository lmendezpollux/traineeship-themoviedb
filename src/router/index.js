import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import DetailView from "@/views/DetailView.vue"
import DetailRelacionadasView from "@/views/DetailRelacionadasView.vue"
import ActorView from "@/views/ActorView.vue"
import SearchView from "@/views/SearchView.vue"
import PerfilView from "@/views/PerfilView.vue"
import FormView from "@/views/FormView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favoritos',
    name: 'favoritesview',
    component: FavoritesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: "perfil",
    component: PerfilView,
  },
  {
    path: "/:nombre/:id",
    name: "detailview",
    component: DetailView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/person/:name/:id",
    name: "actorview",
    component: ActorView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:type/:name/:id",
    name: "DetailRelacionadasView",
    component: DetailRelacionadasView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:query',
    name: 'searchview',
    component: SearchView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/personalizar/usuario/:usuario/:id",
    name: "FormView",
    component: FormView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (JSON.parse(localStorage.getItem("auth"))) {
      next();
    } else {
      next({ name: "perfil"});
      
    }
  } else {
    next();
  }
});

export default router
