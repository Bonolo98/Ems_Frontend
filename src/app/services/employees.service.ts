import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employeeModel';
import { environment, environment2 } from './environments';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor( private httpClient: HttpClient ) { }

  private baseURL: string = environment2.baseUrl;

  private getAuthHeaders(): HttpHeaders{
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEmployees(): Observable<any> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/`, {headers: this.getAuthHeaders()});
  }

  addEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add`, employee, {headers: this.getAuthHeaders()});
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`, {headers: this.getAuthHeaders()});
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee, {headers: this.getAuthHeaders()});
  }

  deleteEmployee(id: number): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/${id}`, {headers: this.getAuthHeaders()});
  }


  searchEmployees(query: string): Observable<Employee[]> {
    let params = new HttpParams().set('query', query);
    return this.httpClient.get<Employee[]>(`${this.baseURL}/search`, { params, headers: this.getAuthHeaders() });
  }

}
