import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AddListModel } from '../_models/addListModel';
import { List } from '../_models/list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  getListsByBoardId(boardId: string) : Observable<List[]> {
    return this.http.get<List[]>(`${this.baseUrl}/BoardList/board/${boardId}`);
  }

  getById(listId: string) : Observable<List> {
    return this.http.get<List>(`${this.baseUrl}/BoardList/${listId}`);
  }
  
  addList(list: AddListModel){
    return this.http.post(`${this.baseUrl}/BoardList`, list);
  }

  updateList(list: List){
    return this.http.put(`${this.baseUrl}/BoardList/${list.id}`, list);
  }

  deleteList(listId: string){
    return this.http.delete(`${this.baseUrl}/BoardList/${listId}`);
  }
}
