// The router create a path for every component
import Vue from 'vue'
import About from '../components/About.vue'
import Board from '../components/Board.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import Account from '../components/Account.vue'
import NotExisting from '../components/NotExisting.vue'
import VueRouter from 'vue-router'
import InstagramSelector from '../components/Selectors/InstagramSelector.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/board', component: Board },
    { path: '/account', component: Account },
    { path: '/signUp', component: SignUp },
    { path: '/signIn', component: SignIn },
    { path: '/about', component: About },
    { path: '/instagramSelector', component: InstagramSelector },
    { path: '/404', component: NotExisting },
    { path: '/', redirect: '/board' },
    { path: '*', redirect: '/404' }
  ]
})

export default router
