export type Task = {
  id: string;
  title: string;
  listId: string;
  createdAt: number;
  completedAt?: number;
}
