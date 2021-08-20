import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getNews(type: string, page: number): Subscriber<any> {
    return this.http.get(`${this.baseUrl}?query=${type}&page=${page}`);
  }

}
