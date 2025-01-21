<script setup lang="ts">
// Types imports
import type { ISurveyQuestionMultipleChoice } from '@/types/Survey';

// Component imports
import TextInput from './TextInput.vue';

interface IProps {
    modelValue: ISurveyQuestionMultipleChoice;
    index: number;
}
defineProps<IProps>();
</script>

<template>
    <div class="row justify-content-center">
        <div v-for="(item, itemIndex) in modelValue.options" class="col-lg-2 col-md-4 col-6 pb-3 pb-lg-0"
            :key="'multiple-choice-option-' + itemIndex">
            <TextInput v-model="item.label" :inputKey="'question-' + index + '-item-' + itemIndex"
                :label="'Option ' + item.number + ' label'" />
        </div>
    </div>
</template>