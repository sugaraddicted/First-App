import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AddListModel } from '../_models/addListModel';
import { List } from '../_models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  
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
