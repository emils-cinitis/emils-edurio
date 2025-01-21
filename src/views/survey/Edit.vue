<script setup lang="ts">
// Vue imports
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Type imports
import type { ISurvey } from '@/types/Survey';

// Store imports
import { useSurveyStore } from '@/stores/survey';
import { useToastStore } from '@/stores/toast';

// Component imports
import Form from '@/components/suvery/Form.vue';

const surveyStore = useSurveyStore();
const toastStore = useToastStore();
const route = useRoute();

const id = route.params.id;

const surveyData = ref<ISurvey | null>(null);
const isLoading = ref<boolean>(true);

const onFormSubmit = (): void => {
    toastStore.show('bg-success', 'Success', 'Survey edited succesfully!');
}

onMounted(() => {
    const data = surveyStore.getSurvey(id as string);
    if (data) surveyData.value = data;

    isLoading.value = false;
});
</script>

<template>
    <Form v-if="!isLoading" :prefilled-data="surveyData ?? undefined" @form-submitted="onFormSubmit"></Form>
</template>