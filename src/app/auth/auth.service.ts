import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  '../interfaces/user';
import { AuthResponse } from  '../interfaces/auth-response';
import { GlobalUrl } from '../globalurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject  =  new  BehaviorSubject(false);

  constructor(
    private  httpClient:  HttpClient, 
    private  storage:  Storage, 
    private globalUrl: GlobalUrl
    ) { 
      
    }


  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.globalUrl.baseAPIUrl}/newuser`, user).pipe(
      tap(async (res:  AuthResponse ) => {
        
        if (res.user) {
          await this.storage.set("token", res.user.token);
          // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      var data = {
        email: user.email,
        password: user.password
      };

      this.httpClient.post(this.globalUrl.baseAPIUrl + '/login', data)
        .subscribe((result: User) => {
          this.storage.set("token", result.token);
          this.storage.set("name_user", result['user'].name);
          this.storage.set("email_user", result['user'].email);
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

  async logout() {
    await this.storage.remove("token");
    // await this.storage.remove("EXPIRES_IN");

    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
