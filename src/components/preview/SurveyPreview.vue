<script setup lang="ts">
// Vue imports
import { onMounted, ref } from 'vue';

// Type imports
import type { ISurvey, ISurveyQuestionMultipleChoice, ISurveyQuestionOpen } from '@/types/Survey';
import { QuestionType } from '@/types/Survey';
import type { IResponse } from '@/types/Response';

// Component imports
import MultipleChoice from './MultipleChoice.vue';
import OpenText from './OpenText.vue';

interface IProps {
    survey: ISurvey;
}
const props = defineProps<IProps>();

const data = ref<IResponse>({ responses: [] });

const submitSurvey = (): void => {
    // Do what's needed with this later (sending to DB, etc.)
    console.log(data.value);
}

onMounted(() => {
    // Setup default data
    props.survey.questions.forEach((question, index) => {
        data.value.responses.push({
            questionNumber: index,
            response: question.type === QuestionType.Multiple_Choice ? 0 : '',
        });
    });
})
</script>

<template>
    <div class="row preview-container" v-if="data.responses.length > 0">
        <div class="col-12 mb-3">
            <h3>{{ survey.name }}</h3>
        </div>
        <div class="col-12">
            <template v-for="(question, index) in survey.questions">
                <MultipleChoice v-if="question.type === QuestionType.Multiple_Choice"
                    :question="question as ISurveyQuestionMultipleChoice" :index="index"
                    v-model="data.responses[index].response as number" :key="'question-' + index" />
                <OpenText v-if="question.type === QuestionType.Open" :question="question as ISurveyQuestionOpen"
                    :index="index" v-model="data.responses[index].response as string" :key="'question-' + index" />
            </template>
        </div>
        <div class="col-12">
            <button class="btn btn-success" @click="submitSurvey">Complete survey</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.preview-container {
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    padding: 12px;

    .question:not(:last-of-type) {
        border-bottom: 1px solid #e9e9e9;
    }
}
</style>