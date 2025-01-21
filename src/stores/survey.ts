import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ISurvey } from '@/types/Survey';

export const useSurveyStore = defineStore('survey', () => {
  const STORAGE_KEY = 'surveys';

  const surveys = ref<ISurvey[]>([]);

  function addSurvey(item: ISurvey): string {
    let id = 0;
    const surveyCount = surveys.value.length;
    if (surveyCount > 0) id = surveys.value.length;

    // Using string to be compatible with UUID / GUID
    item.id = id.toString();

    surveys.value.push(item);
    saveSurveysToStorage();

    return item.id;
  }

  function editSurvey(item: ISurvey): void {
    const id = item.id;
    const oldSurvey = surveys.value.find((e) => e.id === id);

    if (!oldSurvey) return;

    oldSurvey.name = item.name;
    oldSurvey.questions = item.questions;

    saveSurveysToStorage();
  }

  function deleteSurvey(id: string): void {
    const surveyIndex = surveys.value.findIndex((e) => e.id === id);
    if (surveyIndex === -1) return;

    surveys.value.splice(surveyIndex, 1);

    saveSurveysToStorage();
  }

  function saveSurveysToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys.value));
  }

  function loadSurveysFromStorage(): void {
    const storedSurveys = localStorage.getItem(STORAGE_KEY);
    if (!storedSurveys) return;

    const parsedSurveys: ISurvey[] = JSON.parse(storedSurveys);
    surveys.value = parsedSurveys;
  }

  function getSurvey(id: string): ISurvey | undefined {
    return surveys.value.find((e) => e.id === id);
  }

  return { surveys, getSurvey, addSurvey, editSurvey, deleteSurvey, loadSurveysFromStorage };
});
