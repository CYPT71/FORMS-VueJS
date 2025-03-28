// src/mocks/questions.ts

import type { Question } from "@/types";



export const mockQuestions: Question[] = [
  {
    id: 'q1',
    label: 'Quel sont vos info ?',
    answer: '',
    children: [
      {
        id: 'q1.1',
        label: 'Quel est votre nom ?',
        answer: '',
      },
      {
        id: 'q1.2',
        label: 'Pourquoi ce nom ?',
        type: 'text',
        answer: '',
      },
      {
        id: 'q1.3',
        label: 'Photo',
        type: 'file',
        answer: '',
      },
    ],
  },
  {
    id: 'q2',
    label: 'Quel est votre métier ?',
    type: 'text',
    answer: '',
  },
];
