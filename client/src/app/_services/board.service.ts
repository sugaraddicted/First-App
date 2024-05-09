import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../_models/list';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  
  getLists() : Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}/BoardList`);
  }
}
