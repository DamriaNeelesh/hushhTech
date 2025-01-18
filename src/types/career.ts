export interface JobPosition {
    leadershipPrinciples: string;
    id: string;
    title: string;
    location: string;
    salary?: string;
    responsibilities: string[];
    qualifications: string[];
  }
  
  export interface DepartmentJobs {
    [department: string]: JobPosition[];
  }