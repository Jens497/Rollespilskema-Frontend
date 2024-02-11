// Composables
import { useAppStore } from '@/store/app'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
const LOGIN_ROUTE_NAME = "Login";

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
        path: 'templates/editor/:templateId',
        name: 'TemplateEditor',
        props: true,
        meta: { appBar: { title: 'view.templateEditor.title' } },
        component: () => import('@/views/TemplateEditor.vue')
      },
      {
        path: 'sheets/:sheetId',
        name: 'SheetViewer',
        props: true,
        meta: { appBar: { title: 'view.sheetViewer.title' } },
        component: () => import('@/views/SheetViewer.vue')
      },
      {
        path: 'login',
        name: LOGIN_ROUTE_NAME,
        meta: { appBar: { title: 'view.Login.title' } },
        component: () => import('@/views/Login.vue')
      }
      // TODO make login route
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from) => {
  const appStore = useAppStore();
  if (!appStore.isLoggedIn && to.name != LOGIN_ROUTE_NAME) {
    return { name: LOGIN_ROUTE_NAME }
  }
  //! TODO cite example in report!!!
})
export default router
