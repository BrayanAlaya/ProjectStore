import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifications } from 'src/app/core/models/Notifications';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _dbUrl: string = environment.apiUrl + "/notification"

  constructor(
    private _http: HttpClient
  ) { 

  }


  save(data: Notifications): Observable<any>{
    return this._http.post(this._dbUrl, data)
  }

  get(token: any, page: string | number = "0"): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)
    const params = new HttpParams().set("page", page)

    return this._http.get(this._dbUrl, {headers: headers, params: params})
  }

  update(id: number | string, token : any): Observable<any>{
    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.put(this._dbUrl + "/" + id, {headers: headers})
  }

}
