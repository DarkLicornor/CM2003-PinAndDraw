import Vue from 'vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Board from '../components/Board.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/board', component: Board },
    { path: '/signUp', component: SignUp },
    { path: '/signIn', component: SignIn },
    { path: '/about', component: About }
  ]
})

export default router
