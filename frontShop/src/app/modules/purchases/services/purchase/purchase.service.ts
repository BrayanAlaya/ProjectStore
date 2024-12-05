import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private _dbUrl: string = environment.apiUrl + "/purchase"

  constructor(
    private _http: HttpClient,
  ) { }

  save(token : any): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(this._dbUrl,{}, {headers: headers})
  }

  getDetail(id: number | string | undefined, token: any): Observable<any>{
    
    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.get(this._dbUrl + "/details/" + id, {headers: headers})
  }

  getSales(token: any, page: number | string = "0"): Observable<any>{
    
    const headers = new HttpHeaders().set("Authorization", token)
    const params = new HttpParams().set("page", page)

    return this._http.get(this._dbUrl + "/sales", {headers: headers,params: params})
  }

  get(token : any, page: number | string = "0"): Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token)

    const params = new HttpParams().set("page", page)
    return this._http.get(this._dbUrl, {headers: headers, params: params})
  }


}
