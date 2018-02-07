import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
/* eslint-disable */
Vue.use(Router)



/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/404', component: _import('404'), hidden: true},

  //  首页
  {
    path: '/',
    component: _import('home/index'),
    redirect: '/home',
    name: '首页',
    hidden: true,
    children: []
  },
  {
    path: '/home',
    component: _import('home/index'),
    name: '首页',
    hidden: true,
    children: []
  },
  
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

