<script setup lang="ts">
interface IProps {
    inputKey: string,
    label: string,
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
    <label :for="inputKey" class="form-label">{{ label }}</label>
    <input :id="inputKey" type="number" :value="modelValue" @input="onUpdate($event)" class="form-control"
        :required="required" />
</template>
