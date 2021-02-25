import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/gate'
  },
  {
    path:'/gate',
    component:()=>import('views/gate.vue')
  },
  {
    path:'/che-sta',
    component:()=>import('views/che-sta.vue')
  },
  {
    path:'/lab-sta',
    component:()=>import('views/lab-sta.vue')
  },
  {
    path:'/pat-data',
    component:()=>import('views/pat-data.vue')
  },
  {
    path:'/pat-man',
    component:()=>import('views/pat-man.vue'),
    children:[
      {
        path:'/pat-man',
        redirect:'/pat-man/man-p'
      },
      {
        path:'/pat-man/login-p',
        component:()=>import('views/pat-man/login-p.vue')
      },
      {
        path:'/pat-man/man-p',
        component:()=>import('views/pat-man/man-p.vue'),
        beforeEnter: (to, from, next) => {
          if(!store.state.login_state.logined){
            next('/pat-man/login-p')
          }
          else{
            next()
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
