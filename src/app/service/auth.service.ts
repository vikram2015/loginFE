import { Injectable } from '@angular/core';
import { config } from '../config/config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected isLoggedIn: boolean = false;
  loginStatus: boolean = false;
  public user = new BehaviorSubject<{ role?: string }>({});

  constructor(private httpClient: HttpClient, private router: Router) {}

  setStatus(value: boolean) {
    this.loginStatus = value;
  }

  getStatus() {
    return this.loginStatus;
  }

  async login(user: { userName: string, password: string }): Promise<any> {
    const promise = new Promise<any>((resolve: Function, reject: Function) => {
      this.httpClient
        .post<any>(config.serverAddress + 'user/login', user)
        .subscribe({
          next: (response: any) => {
            if (response && response.status == 200 && response.result.token) {
              this.setSession(response.result.token, response.result.token);
              this.setUserDetails(response?.result);
              this.isLoggedIn = true;
              this.loginStatus = true;
            }
            resolve(response);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          },
          complete: () => {
            alert('Login successfull');
          },
        });
    });
    return promise;

    // return this.httpClient.post<any>(config.serverAddress + 'login', user).pipe(
    //   tap((response) => {
    //     console.log(response)
    //     console.log(response.status)
    //     console.log(response.access_token)
    //     console.log(response.refresh_token)
    //     if (response && response.status == 200 && response.access_token) {
    //       this.setSession(response.access_token, response.refresh_token);
    //       this.setUserDetails(response?.user);
    //       this.isLoggedIn = true;
    //     }
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     return err;
    //   })
    // )
  }
  async register(user: { userName: string, email: string, password: string }): Promise<any> {
    const promise = new Promise<any>((resolve: Function, reject: Function) => {
      this.httpClient
        .post<any>(config.serverAddress + 'user/register', user)
        .subscribe({
          next: (response: any) => {
            if (response && response.status == 200 && response.result.token) {
              this.setSession(response.result.token, response.result.token);
              this.setUserDetails(response?.result);
              this.isLoggedIn = true;
              this.loginStatus = true;
            }
            resolve(response);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          },
          complete: () => {
            alert('Login successfull');
          },
        });
    });
    return promise;
  }

  private setSession(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  private setUserDetails(user: any) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('id', user.userId);
    localStorage.setItem('role', user.role);
  }
  private removeLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    this.removeLocalStorage();
    localStorage.clear();
    this.loginStatus = false;
  }

  isUserAuthenticated() {
    return localStorage.getItem('access_token') ? true : false;
  }
}
