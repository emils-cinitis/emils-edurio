<script setup lang="ts">
// Vue imports
import { reactive } from 'vue';

// Type imports
import type { ISmallText } from '@/types/HomeText';

// Component imports
import SmallText from '@/components/home/SmallText.vue';

defineOptions({
    name: 'HomeIndex',
});

const listData = reactive<ISmallText[]>([
    {
        header: 'CRUD surveys with question types:',
        colSize: 4,
        subText: [
            'Multiple choice, with a rating of 1-5 and customizable labels',
            'Open format (text area) with customizable maximum length',
        ],
    },
    { header: 'Storage of surveys locally (using localStorage)', colSize: 4 },
    { header: 'Ability to preview how the surveys look', colSize: 4 },
])
</script>

<template>
    <div class="row gy-3">
        <div class="col-12 text-center py-5 border-bottom">
            <h3>Hello, my name is Emīls Cinītis and this is my task for Edurio!</h3>
        </div>

        <div class="col-12 text-center border-bottom">
            <h4 class="pb-3">Current functionality:</h4>
        </div>

        <SmallText v-for="(item, index) in listData" :item="item" :key="'small-text-' + index" />
    </div>
</template>

<style lang="scss" scoped>
.item-list {
    border-right: 1px solid var(--bs-border-color);

    @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid var(--bs-border-color);
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
}
</style>
