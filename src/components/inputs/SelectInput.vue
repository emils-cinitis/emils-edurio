<script setup lang="ts">
// Type imports
import type { ISelectOption } from '@/types/Select';

interface IProps {
    inputKey: string,
    label: string,
    items: ISelectOption[],
    modelValue: string,
};
const props = defineProps<IProps>();

interface IEmits {
    'update:modelValue': [value: string];
}
const emit = defineEmits<IEmits>();

const onUpdate = (event: Event): void => {
    const element = event.target as HTMLSelectElement;
    emit('update:modelValue', element.value);
}
</script>
<template>
    <label :for="inputKey" class="form-label">{{ label }}</label>
    <select :id="inputKey" :value="modelValue" @input="onUpdate($event)" class="form-select">
        <option v-for="item in items" :value="item.id">
            {{ item.name }}
        </option>
    </select>
</template>
