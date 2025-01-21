import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', () => {
  const shouldShowKey = ref<number>(0);

  const toastType = ref<string>('');
  const toastTitle = ref<string>('');
  const toastText = ref<string>('');

  function show(type: string, title: string, text: string): void {
    toastType.value = type;
    toastTitle.value = title;
    toastText.value = text;

    shouldShowKey.value += 1;
  }

  return { toastTitle, toastText, toastType, shouldShowKey, show };
});
