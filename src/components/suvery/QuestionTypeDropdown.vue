<script setup lang="ts">
// Type imports
import { QuestionType } from '@/types/Survey';

interface IProps {
    buttonLabel: string;
}
const props = defineProps<IProps>();

interface IEmits {
    'itemSelected': [value: string];
}
const emit = defineEmits<IEmits>();

const getQuestionTypeText = (type: string): string => type.replace('_', ' ');
</script>

<template>
    <div class="dropdown">
        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">
            {{ buttonLabel }}
        </button>
        <ul class="dropdown-menu">
            <li v-for="(_, value) in QuestionType">
                <button type="button" class="btn w-100" @click="emit('itemSelected', value)">
                    {{ getQuestionTypeText(value) }}
                </button>
            </li>
        </ul>
    </div>
</template>