import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _dbUrl: string
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private _http: HttpClient,
    private _r: Router,
    private _snackBar: MatSnackBar
  ) {
    this._dbUrl = environment.apiUrl;
  }

  login(user: User): Observable<any> {
    return this._http.post(this._dbUrl + "/user/login", user)
  }

  update(user: FormData, token: any): Observable<any> {

    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.put(this._dbUrl + "/user/update", user, { headers: headers })
  }

  delete(token: any): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": token,
    })

    return this._http.delete(this._dbUrl + "/user/delete", { headers: headers })
  }

  sendAuthCode(user: User): Observable<any> {
    return this._http.post(this._dbUrl + "/user/code/create-code", user)
  }

  authCode(user: User): Observable<any> {
    return this._http.post(this._dbUrl + "/user/code", user)
  }

  changePassword(user: User, token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this._http.post(this._dbUrl + "/user/code/change-password", user, { headers: headers })
  }

  confirmValidAuthAccoutn(token: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': token
    })

    return this._http.post(this._dbUrl + "/user/code/auth-account", null, { headers: headers })
  }

  register(user: User): Observable<any> {
    return this._http.post(this._dbUrl + "/user/register", user)
  }

  getLocalUSer(): User | null {

    if (localStorage.getItem("user") == null) {
      return null
    }

    return JSON.parse(localStorage.getItem("user") ?? "");
  }

  getLocalToken(): String | null {

    return localStorage.getItem("token");
  }

  closeSesion(message: string = 'Sesión Expirada!!'): void {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this._r.navigate(["/"])
  }
}
