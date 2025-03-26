import type { WithId, WithLabel } from './_Common';

export type Question = WithId & WithLabel & {
  answer?: string;
  type?: "text" | "file" | "checkbox" | "submit";
  children?: Question[];
};

export type errorType = Record<string, string>;

export type QuestionBlock = {
  question: Question;
  errors: errorType;
};

export type QuestionInput = {
  question: Question;
  error?: string;
};

export type QuestionEmit = {
  (e: 'update:answer', id: string, value: string): void;
};
