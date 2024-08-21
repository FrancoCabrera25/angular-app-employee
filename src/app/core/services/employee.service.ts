import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  EmployeeResponse,
  JobsPositionsResponse,
} from '../../shared/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private base_url = `${environment.API_EMPLOYEE}/employee`;

  getListEmployee(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.base_url}/list`);
  }

  getListJobsPositions(): Observable<string[]> {
    return this.http
      .get<JobsPositionsResponse>(`${this.base_url}/jobsPositions`)
      .pipe(map((result) => result.positions));
  }
}
