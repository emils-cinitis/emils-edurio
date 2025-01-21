<script setup lang="ts">
// Component imports
import SurveyTable from '@/components/suvery/Table.vue';

defineOptions({
    name: 'SurveyList',
});
</script>

<template>
    <div class="row">
        <SurveyTable />
    </div>
    <div class="row">
        <div class="col-12">
            <RouterLink :to="{ name: 'survey-create' }" class="btn btn-success w-100">Add survey</RouterLink>
        </div>
    </div>
</template>
