export interface Incident {
  id: number;
  description: string;
  createdAt: string;
  status: string;
  observation?: string;
  updateAt?: string;
}
