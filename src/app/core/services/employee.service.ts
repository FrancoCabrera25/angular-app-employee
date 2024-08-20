import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponse } from '../../shared/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private base_url = `${environment.API_EMPLOYEE}/employee`;

  getListEmployee(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.base_url}/list`);
  }
}
