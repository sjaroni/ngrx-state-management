import { Course } from '../../models/course.model';

export interface CoursesState {
  courses: Course[];
  showForm: boolean;
}

export const initialState: CoursesState = {
  courses: [
    {
      id: 1,
      title: 'Einführung in Angular',
      description:
        'Ein umfassender Leitfaden für den Einstieg in Angular mit vielen Praxisbeispielen.',
      image: './images/angular.jpg',
      author: 'Stefan Jaroni',
      price: 39.99,
    },
    {
      id: 2,
      title: 'Meistere NestJS',
      description:
        'Ein praxisorientiertes Buch zur Entwicklung robuster Backend-Anwendungen mit NestJS.',
      image: './images/javascript.jpg',
      author: 'Max Mustermann',
      price: 44.95,
    },
  ],
  showForm: false
};
