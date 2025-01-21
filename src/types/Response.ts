export interface IResponse {
  responses: IResponseType[];
}

export interface IResponseType {
  questionNumber: number;
  response: string | number;
}
