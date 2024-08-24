export interface EmployeeResponse {
  limit: number;
  page: number;
  total: number;
  employees: Employee[];
}

export interface Employee {
  name: string;
  lastName: string;
  email: string;
  birthdate: string;
  position: string;
  active: boolean;
  id: string;
}
export interface JobsPositionsResponse {
  positions: string[];
}
