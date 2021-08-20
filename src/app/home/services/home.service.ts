import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getNews(type: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?query=${type}&page=${page}`);
  }

}
