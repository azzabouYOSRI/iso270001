export interface Project {
  id: number;
  name: string;
  description: string;
  budget: string;
  client: {
    id: number;
    companyName: string;
  };
  startDate: Date;
}
