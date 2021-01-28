import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',name:"剧集" ,component:()=>import('../views/Tv.vue')
  },
  {
    path:'/music',name:"音乐", component:()=>import('../views/Music.vue')
  },
  {
    path:'/book',name:"书籍", component:()=>import('../views/Book.vue')
  },
  {
    path:'/chat',name:"聊天", component:()=>import('../views/Chat.vue')
  },
  {path:'/tvDetail/:id',component:()=>import('../views/TvDetail.vue')},
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
