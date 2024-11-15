import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { loginResponse, loginUs, registerUs, User } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  loggedIn$ = this.loggedInSubject.asObservable();

  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/api';

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('Decoded JWT:', decoded);
      return decoded.role;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  registerUser(data: registerUs) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  // loginUser(data: LoginFormType) {
  //   return this.http.post<LoginRes>(`${this.apiUrl}/login`, data);
  // }
  loginUser(data: loginUs) {
    return this.http.post<loginResponse>(`${this.apiUrl}/login`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
