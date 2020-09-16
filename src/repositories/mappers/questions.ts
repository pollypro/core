import { QuestionSchema } from '../schemas/Question';

export type QuestionObject = {
  id: string;
  question: string;
  serviceId: string;
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
    serviceId: document.serviceId.toString(),
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
};
