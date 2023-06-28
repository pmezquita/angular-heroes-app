import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../interfaces/user.interface";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {
  }

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // http.post('login',{email, password});

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'asKJsd34k.jj24kjkJKJS.87asdasd')),
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => of(false)),
      );
  }
}
