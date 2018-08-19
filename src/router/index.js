import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import MyCircle from '@/components/MyCircle'
import HisCircle from '@/components/HisCircle'
import ReleaseCircle from '@/components/ReleaseCircle'
import SelectorLabel from '@/components/SelectorLabel'
import HomePage from '@/components/HomePage'
import CircleDetails from '@/components/CircleDetails'
import MyFollow from '@/components/MyFollow'
import MyFans from '@/components/MyFans'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const routes =[
    {
      path: '/',
      redirect: '/HomePage'
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/MyCircle',
      name: 'MyCircle',
      component: MyCircle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/HisCircle',
      name: 'HisCircle',
      component: HisCircle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/ReleaseCircle',
      name: 'ReleaseCircle',
      component: ReleaseCircle,
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: 'SelectorLabel',
          name: 'SelectorLabel',
          component: SelectorLabel
        },
      ]
    },
    {
      path: '/CircleDetails',
      name: 'CircleDetails',
      component: CircleDetails,
      meta: {
        keepAlive: false
      }
    },
    {
    path: '/MyFollow',
    name: 'MyFollow',
    component: MyFollow,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MyFans',
      name: 'MyFans',
      component: MyFans,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: false
      }
    }
  ]
const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
    store.state.activeFooterMenu = to.name;
    next();
});


export default router;
