<script setup lang="ts">
// Vue imports
import { reactive, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

// Store imports
import { useSurveyStore } from '@/stores/survey';

// Type imports
import type { INavigationItem } from '@/types/NavigationItem.ts';

// Component imports
import Toast from './components/Toast.vue';

// Using reactive as array will not be changed
const navigationItems = reactive<INavigationItem[]>([
  { title: 'Home', pathName: 'home' },
  { title: 'Surveys', pathName: 'survey-list' },
  { title: 'Preview', pathName: 'preview' },
]);

const surveyStore = useSurveyStore();

onMounted(() => {
  surveyStore.loadSurveysFromStorage();
});
</script>

<template>
  <header class="bg-dark d-flex justify-content-center py-2">
    <ul class="nav nav-pills gap-3">
      <li v-for="item in navigationItems" class="nav-item">
        <RouterLink :to="{ name: item.pathName }" class="nav-link text-white" exactActiveClass="active">
          {{ item.title }}
        </RouterLink>
      </li>
    </ul>
  </header>
  <main class="container pt-4">
    <RouterView />
  </main>

  <Toast />
</template>

<style lang="scss" scoped>
.nav-link {
  border: 1px solid #FFFFFF;

  &.active {
    background-color: var(--bs-green);
  }
}
</style>
