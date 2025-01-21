<script setup lang="ts">
// Vue imports
import { useRouter } from 'vue-router';

// Component imports
import Form from '@/components/suvery/Form.vue';

const router = useRouter();

const onFormSubmit = (id: string): void => {
    router.push({ name: 'survey-edit', params: { id } });
}
</script>

<template>
    <Form @form-submitted="onFormSubmit($event)"></Form>
</template>