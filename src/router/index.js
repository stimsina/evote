import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/authentication/Signup'
import Login from '@/components/authentication/Login'
import UserDetail from '@/components/users/UserDetail.vue'
import AddParticipant from '@/components/participants/AddParticipant'
import firebase from 'firebase'
Vue.use(Router)

const router=new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        needsLogin:true
      }
    },{
      name:'Signup',
      path:'/signup',
      component:Signup
    },{
      name:'Login',
      path:'/login',
      component:Login
    },{
      name:'UserDetail',
      path:'/userDetail/:id',
      component:UserDetail,
      meta:{
        needsLogin:true
      }
    },{
      name:'AddParticipant',
      path:'/addParticipant',
      component:AddParticipant,
      meta:{
        needsLogin:true
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(rec=>rec.meta.needsLogin)){
    if(firebase.auth().currentUser){
      next()
    }
    else{
      next({name:'Login'})
    }
  }
  else{
    next()
  }
})

export default router;