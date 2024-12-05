import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _dbUrl: string

  constructor(
    private _http: HttpClient
  ) {
    this._dbUrl = environment.apiUrl
  }

  create(product: FormData, token: any): Observable<any> {

    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.post(this._dbUrl + "/product", product, { headers: headers })
  }

  update(product: FormData, token: any, id: string | number | undefined): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", token)
    return this._http.put(this._dbUrl + "/product/" + id, product, {headers: headers})
  }

  get(name: string = "", page: string | number = "", user: string | number = "", category: string | number = "", id: string | number = "", token: String | null = ""): Observable<any> {

    const params = new HttpParams()
      .set("id", id)
      .set("name", name)
      .set("page", page)
      .set("user", user)
      .set("category", category)
      .set("token", token == null ? "" : token.toString())

    return this._http.get(this._dbUrl + "/product", { params: params })
  }

  delete(id: number | string | undefined, token: any): Observable<any>{
    const headers = new HttpHeaders().set("Authorization", token)

    return this._http.delete(this._dbUrl + "/product/" + id, {headers: headers})
  }

}
