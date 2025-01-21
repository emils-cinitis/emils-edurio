<script setup lang="ts">
// Type imports
import type { ISurveyQuestionMultipleChoice } from '@/types/Survey';

interface IProps {
    question: ISurveyQuestionMultipleChoice,
    index: number,
    modelValue: number,
    required?: boolean;
}
withDefaults(defineProps<IProps>(), { required: true });

interface IEmits {
    'update:modelValue': [value: number];
}
const emit = defineEmits<IEmits>();

const onUpdate = (event: Event): void => {
    const element = event.target as HTMLInputElement;
    emit('update:modelValue', parseInt(element.value));
}
</script>

<template>
    <div class="row mb-4 pb-4 question">
        <div class="col-12">
            <label :for="'question-' + index + '-slider'" class="mb-2">{{ question.label }}</label>
            <input :value="modelValue" @input="onUpdate($event)" :id="'question-' + index + '-slider'" type="range"
                class="form-range" min="0" :max="question.options.length - 1" />
            <span class="d-block text-center">{{ question.options[modelValue].label }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-range::-webkit-slider-runnable-track {
    background-image: linear-gradient(to right, #00d641, #51d934, #75db27, #93dd19, #addf0a, #c2d200, #d3c500, #e0b800, #e59900, #e67800, #e35415, #da2727);
}
</style>