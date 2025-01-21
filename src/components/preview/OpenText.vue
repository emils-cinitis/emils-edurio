<script setup lang="ts">
// Type imports
import type { ISurveyQuestionOpen } from '@/types/Survey';

interface IProps {
    question: ISurveyQuestionOpen,
    index: number,
    modelValue: string,
    required?: boolean;
}
const props = withDefaults(defineProps<IProps>(), { required: true });

interface IEmits {
    'update:modelValue': [value: string];
}
const emit = defineEmits<IEmits>();

const onUpdate = (event: Event): void => {
    const element = event.target as HTMLTextAreaElement;
    emit('update:modelValue', element.value);
}
</script>

<template>
    <div class="row mb-4 pb-4 question">
        <div class="col-12">
            <label :for="'question-' + index + '-textarea'" class="mb-2">{{ question.label }}</label>
            <textarea :value="modelValue" @input="onUpdate($event)" :id="'question-' + index + '-textarea'"
                class="form-control" :maxlength="question.maxLength"></textarea>
        </div>
    </div>
</template>