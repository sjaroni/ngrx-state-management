export interface Course {
  id?: number; // optional, weil es beim Erstellen noch keinen Wert hat
  title: string;
  description: string;
  image: string;
  author: string;
  price: number;
}