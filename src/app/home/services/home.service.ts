import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  /** Get apiUrl set globally in environment. */
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return http petition of news data.
   * @param type option selected.
   * @param page page toquery.
   * @returns http petition.
   */
  getNews(type: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?query=${type}&page=${page}`);
  }

}
