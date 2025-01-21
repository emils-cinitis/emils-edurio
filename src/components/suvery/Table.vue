<script setup lang="ts">
// Vue imports
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// Store imports
import { useSurveyStore } from '@/stores/survey';

// Type imports
import type { ISurvey } from '@/types/Survey';

const router = useRouter();
const surveyStore = useSurveyStore();

const surveys = computed<ISurvey[]>(() => surveyStore.surveys);

const redirectToItem = (id: string): void => {
    if (!id) return;
    router.push({ name: 'survey-edit', params: { id } });
}

const deleteSurvey = (id: string): void => {
    surveyStore.deleteSurvey(id);
}
</script>

<template>
    <div class="col-12">
        <table v-if="surveys.length > 0" class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Question count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in surveys" @click="redirectToItem(item.id)">
                    <td>{{ item.name }}</td>
                    <td>{{ item.questions.length }}</td>
                    <td><button class="btn btn-danger" @click.stop="deleteSurvey(item.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>

        <div v-else class="text-center mb-3">
            <h3 class="w-100">No surveys found!</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>
tbody {
    tr {
        cursor: pointer;

        td:last-of-type {
            width: 1%;
        }
    }
}
</style>
