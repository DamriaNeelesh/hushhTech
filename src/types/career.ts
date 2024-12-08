export interface JobPosition {
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