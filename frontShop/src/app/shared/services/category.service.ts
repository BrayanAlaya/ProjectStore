import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dburl: string

  constructor(
    private _http: HttpClient
  ) {
    this.dburl = environment.apiUrl
  }

  get(name: string = "", page: string | number = "1"): Observable<any> {

    const params = new HttpParams()
      .set("name", name)
      .set("page", page.toString())

    return this._http.get(this.dburl + "/category/browse", { params })
  }

}
