// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { appBar: { title: 'view.home.title', canNavigateBack: false } },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'empty',
        name: 'Empty',
        meta: { appBar: { title: 'view.empty.title' } },
        component: () => import('@/views/Empty.vue')
      },
      {
        path: 'templates/editor/:templateId?',
        name: 'TemplateEditor',
        props: true,
        meta: { appBar: {title: 'view.templateEditor.title'}},
        component: () => import('@/views/TemplateEditor.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
