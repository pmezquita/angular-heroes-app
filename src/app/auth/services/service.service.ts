import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../interfaces/user.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {
  }

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // http.post('login',{email, password});

    return this.http.get<User>(`${this.baseUrl}/user/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString())),
      );
  }
}
