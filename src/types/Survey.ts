export interface ISurvey {
  id: string;
  name: string;
  questions: (ISurveyQuestionMultipleChoice | ISurveyQuestionOpen)[];
}

export interface ISurveyQuestion {
  type: QuestionType;
  label: string;
}

export enum QuestionType {
  Multiple_Choice = 'MultipleChoice',
  Open = 'Open',
}

export interface ISurveyQuestionMultipleChoice extends ISurveyQuestion {
  options: IMultipleChoiceOption[];
}

export interface IMultipleChoiceOption {
  number: number;
  label: string;
}

export interface ISurveyQuestionOpen extends ISurveyQuestion {
  maxLength: number;
}
