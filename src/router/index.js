import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
  },
  {
    path: '/',
    name: 'Notes',
    component: () => import('../views/Notes.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
