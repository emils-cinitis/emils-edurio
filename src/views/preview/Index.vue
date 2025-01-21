<script lang="ts" setup>
// Vue imports
import { computed, ref } from 'vue';

// Store imports
import { useSurveyStore } from '@/stores/survey';

// Type imports
import type { ISelectOption } from '@/types/Select';
import type { ISurvey } from '@/types/Survey';

// Component imports
import SelectInput from '@/components/inputs/SelectInput.vue';
import SurveyPreview from '@/components/preview/SurveyPreview.vue';

const surveyStore = useSurveyStore();

const surveyOptions = computed<ISelectOption[]>(() =>
    surveyStore.surveys.map(e => {
        return {
            id: e.id,
            name: e.name,
        } as ISelectOption
    })
);

const selectedSurvey = computed<ISurvey | undefined>(() => surveyStore.getSurvey(selectedSurveyId.value));

const selectedSurveyId = ref<string>('');
</script>

<template>
    <div class="mb-5">
        <SelectInput v-model="selectedSurveyId" :items="surveyOptions" inputKey="survey-select"
            label="Select survey:" />
    </div>

    <SurveyPreview v-if="selectedSurvey" :survey="selectedSurvey" />
</template>