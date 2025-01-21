<script setup lang="ts">
// Vue imports
import { ref, computed, watch } from 'vue';
import { Toast } from 'bootstrap';

// Store imports
import { useToastStore } from '@/stores/toast';

defineOptions({
    name: 'CommonToast',
});

const toastStore = useToastStore();

const toast = ref<HTMLElement | null>();

const toastType = computed<string>(() => toastStore.toastType);
const toastTitle = computed<string>(() => toastStore.toastTitle);
const toastText = computed<string>(() => toastStore.toastText);

watch(() => toastStore.shouldShowKey, (value: number, _: number) => {
    if (!value || !toast.value) return;

    const toastElement = new Toast(toast.value);
    toastElement.show();
});
</script>

<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <span class="badge me-auto" :class="toastType">
                    <strong>{{ toastTitle }}</strong>
                </span>
                <small class="text-body-secondary">just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ toastText }}
            </div>
        </div>
    </div>
</template>