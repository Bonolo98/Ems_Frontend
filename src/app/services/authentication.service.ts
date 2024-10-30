import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { response } from 'express';
import { Observable, tap } from 'rxjs';
import { Employee } from '../model/employeeModel';
import { Router } from '@angular/router';
import { environment } from './environments';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private baseURL: string = environment.baseUrl;

  private isAuthenticated = false;

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  register(registerRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, registerRequest).pipe(
      tap((response: any) => {
      })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/login`, loginRequest,).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        this.isAuthenticated = true;
        return true;
      })
    );
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  logout() {
    console.log('Logout called, removing token...');
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getUserDetails() {
    return this.httpClient.get<Employee>(`${this.baseURL}/me`, { headers: this.getAuthHeaders() })
  }
}
