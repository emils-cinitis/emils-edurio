import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/Index.vue';
const SurveyList = () => import('../views/survey/List.vue');
const SurveyCreate = () => import('../views/survey/Create.vue');
const SurveyEdit = () => import('../views/survey/Edit.vue');
const PreviewIndex = () => import('../views/preview/Index.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/survey/list',
      name: 'survey-list',
      component: SurveyList,
    },
    {
      path: '/survey/create',
      name: 'survey-create',
      component: SurveyCreate,
    },
    {
      path: '/survey/edit/:id',
      name: 'survey-edit',
      component: SurveyEdit,
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewIndex,
    },
  ],
});

export default router;
