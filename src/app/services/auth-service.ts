import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { map, Observable,tap } from 'rxjs';

export interface SessionUser{
  id: number;
  name: string;
  email: string;
}

interface LoginResponse{
  token: string;
  message:string,
  user:SessionUser 
}

@Injectable({
  providedIn: 'root',
})

export class AutService {
  private http=inject(HttpClient);
 
  private readonly storageKey = 'session_user';
  private readonly storageKeyToken='session_token';
  private readonly loginUrl = `${enviroment.apiUrl}/auth/login`;

  private readonly _currentUSer = signal<SessionUser | null>(this.readFromStorage());
  readonly currentUser = computed(() => this._currentUSer());
  readonly isAutenticated = computed(() => this._currentUSer() !== null);

  login(email: string, password: string) : Observable<SessionUser> {
  console.log(this.loginUrl);
    return this.http.post<LoginResponse>(this.loginUrl, { email, password }).pipe(
      tap((response)=>{
        localStorage.setItem(this.storageKey, JSON.stringify(response.user));
        localStorage.setItem(this.storageKeyToken, response.token);
        this._currentUSer.set(response.user);
        console.log(response.user);
      }),
      map((response)=>response.user)
    );
  }
  
  readFromStorage() : SessionUser | null {
    const user = localStorage.getItem(this.storageKey);
    if (!user) return null;
    try{
      return JSON.parse(user) as SessionUser;
    }catch{
      return null; 
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
  
  logout() : void {
    this._currentUSer.set(null);
    localStorage.removeItem(this.storageKey);
  }
  
}
