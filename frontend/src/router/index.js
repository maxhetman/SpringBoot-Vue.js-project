import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'

import login from '../components/login/login.vue';
import admin from '../components/admin/admin.vue';
import user from '../components/user/user.vue';
import error from '../components/user/user.vue';

import { Navbar } from 'bootstrap-vue/es/components';

Vue.use(VueRouter);
Vue.use(Navbar);


 const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      name:'login',
      path:'/login',
      component:login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      name:'admin',
      path:'/admin',
      component:admin,
      meta: { requiresAuth: true , adminAuth:true, userAuth : false}
    },
    {
      name:'user',
      path:'/user',
      component:user,
      meta: { requiresAuth: true , adminAuth:false, userAuth:true}
    },
   {
     name:'error',
     path:'/error',
     component:error
   }
  ];

const router = new VueRouter({routes,mode:'history'})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if(!authUser || !authUser.token) {
      next({name:'login'})
    }
    else if(to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if(authUser.data.role_id === 'admin') {
        next()
      }else {
        next('/user')
      }
    } else if(to.meta.userAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if(authUser.data.role_id === 'user') {
        console.log('Im in user');
        next()
      }else {
        console.log('Im in admin');
        next('/admin')
      }
    }
  }else {
    next()
  }
});


export default router;

