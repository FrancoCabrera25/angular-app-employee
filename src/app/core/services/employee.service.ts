import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Employee,
  EmployeeResponse,
  JobsPositionsResponse,
} from '../../shared/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private base_url = `${environment.API_EMPLOYEE}/employee`;

  create(employee: Employee): Observable<any> {
    return this.http.post(`${this.base_url}`, {
      ...employee,
    });
  }
  update(id: string, employee: Employee): Observable<any> {
    return this.http.put(`${this.base_url}/${id}`, {
      ...employee,
    });
  }
  getListEmployee(page = 1, limit = 10, filterName= ''): Observable<EmployeeResponse> {
    let url = ` ${this.base_url}/list?page=${page}&limit=${limit} `;

    if(filterName) {
      url = url.concat(`&name=${filterName}`);
    }
    return this.http.get<EmployeeResponse>(url);
  }

  getListJobsPositions(): Observable<string[]> {
    return this.http
      .get<JobsPositionsResponse>(`${this.base_url}/jobsPositions`)
      .pipe(map((result) => result.positions));
  }
}
