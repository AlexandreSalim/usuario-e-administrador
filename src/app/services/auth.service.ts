import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _httpClient: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string; }> {
    return this._httpClient.post<{ token: string; }>('http://localhost:3000/login', { username, password }).pipe(
      map(resp => {
        localStorage.setItem('access-token', resp.token);

        return resp;
      })
    )
  }

  verifyToken(): Observable<{ valid: boolean; user: any; }> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access-token'));

    return this._httpClient.get<{ valid: boolean; user: any; }>('http://localhost:3000/verify-token', { headers });
  }

  getUserScopes(): string[] {
    const token = localStorage.getItem('access-token');

    if(!token) {
      return [];
    }

    const decoded: any = jwtDecode(token);

    return decoded.scopes;
  }

  getUserwalletStatus(): string {
    const token = localStorage.getItem('access-token');

    if(!token) {
      return '';
    }

    const decoded: any = jwtDecode(token);

    return decoded.walletStatus;
  }

  logout() {
    localStorage.removeItem('access-token');
  }
}
