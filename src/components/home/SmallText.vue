<script setup lang="ts">
// Vue imports
import { computed } from 'vue';

// Type imports
import type { ISmallText } from '@/types/HomeText';

interface IProps {
    item: ISmallText;
}
const props = defineProps<IProps>();

const columnSize = computed<number>(() =>
    props.item?.subText?.length ?
        Math.floor(12 / props.item.subText.length) :
        12
);

</script>

<template>
    <div :class="'item-list align-content-center col-12 col-md-' + item.colSize">
        <h5 class="text-center mb-3">{{ item.header }}</h5>

        <div v-if="item.subText" class="row">
            <div v-for="text in item.subText" :class="'col-12 col-md-' + columnSize">
                {{ text }}
            </div>
        </div>
    </div>
</template>