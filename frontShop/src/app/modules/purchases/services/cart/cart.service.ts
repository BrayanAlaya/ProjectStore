import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/core/models/Cart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _dbUrl: string

  constructor(
    private _http: HttpClient
  ) { 
    this._dbUrl = environment.apiUrl + "/cart"
  }

  save(data: Cart, token: any) : Observable<any>{
    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.post(this._dbUrl, data, {headers: headers})
  }

  get(token: any):Observable<any>{

    const headers = new HttpHeaders().set("Authorization", token) 

    return this._http.get(this._dbUrl,{headers: headers});
  }

  delete(id: number | string,token: any) : Observable<any>{
    const headers = new HttpHeaders().set("Authorization", token) 

    return this._http.delete(this._dbUrl + "/" + id,{headers: headers});
  }

}

