import { QuestionSchema } from '../schemas/Question';

export type QuestionObject = {
  id: string;
  question: string;
  testId: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const mapQuestion = (document?: QuestionSchema): QuestionObject | null => {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toString(),
    question: document.question,
    testId: document.testId.toString(),
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
