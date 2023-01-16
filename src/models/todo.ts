export type Todo = {
  id: string;
  title: string;
  project: string;
  createdAt: Date;
  completedAt?: Date;
}
