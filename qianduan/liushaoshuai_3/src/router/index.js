import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import imagesinfo from '@/components/imagesinfo'
import top from '@/components/top'
import goodsinfo from '@/components/goodsinfo'
import login from '@/components/login'
import login_1 from '@/components/login_1'
import cart from '@/components/cart'
import order from '@/components/order'
import orderlist from '@/components/orderlist'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
    },
    {
      path: '/imagesinfo',
      name: 'imagesinfo',
      component: imagesinfo,
    },
    {
     	path: '/top',
     	name: 'top',
     	component: top,
    },
    {
     	path: '/goodsinfo',
     	name: 'goodsinfo',
     	component: goodsinfo,
    },
    {
     	path: '/login',
     	name: 'login',
     	component: login,
    },
    {
     	path: '/login_1',
     	name: 'login_1',
     	component: login_1,
    },  
    {
     	path: '/cart',
     	name: 'cart',
     	component: cart,
    },    
    {
     	path: '/order',
     	name: 'order',
     	component: order,
    }, 
    {
     	path: '/orderlist',
     	name: 'orderlist',
     	component: orderlist,
    }, 
  ]
})
