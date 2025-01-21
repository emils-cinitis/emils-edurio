<script setup lang="ts">
// Vue imports
import { onMounted, ref } from 'vue';

// Store imports
import { useSurveyStore } from '@/stores/survey';

// Type imports
import type { IMultipleChoiceOption, ISurvey, ISurveyQuestion, ISurveyQuestionMultipleChoice, ISurveyQuestionOpen } from '@/types/Survey';
import { QuestionType } from '@/types/Survey';

// Component imports
import TextInput from '../inputs/TextInput.vue';
import QuestionMultipleChoiceInput from '../inputs/QuestionMultipleChoiceInput.vue';
import QuestionTypeDropdown from './QuestionTypeDropdown.vue';
import NumberInput from '../inputs/NumberInput.vue';

interface IProps {
    prefilledData?: ISurvey,
}
const props = defineProps<IProps>();

interface IEmits {
    'formSubmitted': [id: string];
}
const emit = defineEmits<IEmits>();

const data = ref<ISurvey>({
    id: '',
    name: '',
    questions: [],
});

const surveyStore = useSurveyStore();

const lastSavedData = ref<ISurvey | null>(null);

onMounted(() => {
    if (props.prefilledData)
        lastSavedData.value = JSON.parse(JSON.stringify(props.prefilledData)); // Deep copy
    resetQuestion();
});

const handleSubmit = (): void => {
    let id: string = '';
    if (props.prefilledData) {
        surveyStore.editSurvey(data.value);
        lastSavedData.value = JSON.parse(JSON.stringify(data.value)); // Deep copy

        id = data.value.id;
    } else
        id = surveyStore.addSurvey(data.value);

    emit('formSubmitted', id);
}

const generateOpenQuestion = (base: ISurveyQuestion): ISurveyQuestionOpen => {
    return {
        ...base,
        maxLength: 1024,
    } as ISurveyQuestionOpen;
}

const generateMultipleChoiceQuestion = (base: ISurveyQuestion): ISurveyQuestionMultipleChoice => {
    const options: IMultipleChoiceOption[] = [];

    const defaultOptionTexts = ['Very often', 'Quite often', 'Sometimes', 'Rarely', 'Never'];
    defaultOptionTexts.forEach((option, index) => {
        options.push({
            number: index + 1,
            label: option,
        });
    });

    return {
        ...base,
        options,
    };
}

const generateQuestionObject = (type: QuestionType, base: ISurveyQuestion): ISurveyQuestionOpen | ISurveyQuestionMultipleChoice | null => {
    let question: ISurveyQuestionOpen | ISurveyQuestionMultipleChoice | null = null;

    // Switch because in future there could be more types
    switch (type) {
        case QuestionType.Open:
            question = generateOpenQuestion(base);
            break;
        case QuestionType.Multiple_Choice:
            question = generateMultipleChoiceQuestion(base);
            break;
    }

    return question;
}

const addSurveyQuestion = (type: string): void => {
    const typeValue = QuestionType[type as keyof typeof QuestionType];

    const baseValue: ISurveyQuestion = {
        label: '',
        type: typeValue,
    };

    let question = generateQuestionObject(typeValue, baseValue);
    if (!question) return;

    // Add new question element
    data.value.questions.push(question);
}

const changeQuestionType = (type: string, index: number): void => {
    const typeValue = QuestionType[type as keyof typeof QuestionType];
    const item = data.value.questions[index];
    const baseValue: ISurveyQuestion = {
        label: item.label,
        type: typeValue,
    };

    let question = generateQuestionObject(typeValue, baseValue);
    if (!question) return;

    // Replace question at index
    data.value.questions[index] = question;
}

const deleteQuestion = (index: number): void => {
    data.value.questions.splice(index, 1);
}

const resetQuestion = (): void => {
    if (!lastSavedData.value) return;

    // Deep copy
    data.value = JSON.parse(JSON.stringify(lastSavedData.value));
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="input-container mb-3">
            <div class="row">
                <div class="col-md-6 col-12">
                    <TextInput v-model="data.name" inputKey="name" label="Survey name" />
                </div>
            </div>
        </div>

        <div v-for="(item, index) in data.questions" class="input-container mb-3">
            <div class="mb-3 row">
                <div class="col-md col-12 pb-2 pb-md-0">
                    <TextInput v-model="data.questions[index].label" :inputKey="'question-' + index"
                        :label="'Question ' + (index + 1) + ' label'" />
                </div>
                <div class="col-md-auto col-12 d-flex flex-wrap gap-2 align-items-end">
                    <QuestionTypeDropdown button-label="Change Type"
                        @item-selected="changeQuestionType($event, index)" />
                    <div>
                        <button type="button" class="btn btn-danger" @click="deleteQuestion(index)">Delete</button>
                    </div>
                </div>
            </div>

            <QuestionMultipleChoiceInput v-if="item.type === 'MultipleChoice'"
                v-model="data.questions[index] as ISurveyQuestionMultipleChoice" :index="index" />

            <NumberInput v-if="item.type === 'Open'" v-model="(data.questions[index] as ISurveyQuestionOpen).maxLength"
                :inputKey="'number-input-' + index" label="Maximum length of input" />
        </div>

        <div class="row justify-content-center button-container">
            <div class="col-12 col-md-auto">
                <QuestionTypeDropdown
                    :button-label="data.questions.length > 0 ? 'Add another question' : 'Add question'"
                    @item-selected="addSurveyQuestion($event)" />
            </div>
            <div class="col-12 col-md-auto">
                <button class="btn btn-success">{{ prefilledData ? 'Edit' : 'Save' }}</button>
            </div>

            <div class="col-12 col-md-auto">
                <button v-if="prefilledData" type="button" class="btn btn-warning"
                    @click="resetQuestion()">Reset</button>
            </div>
        </div>

    </form>
</template>

<style lang="scss">
form {
    .input-container {
        padding-bottom: 1rem;
        border-bottom: 1px solid #000000;
    }

    .button-container {
        gap: 12px 0;

        @media (max-width: 768px) {
            button {
                width: 100%;
            }
        }
    }
}
</style>
