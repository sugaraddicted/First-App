import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ActivityLog } from '../_models/activityLog';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  
  getByCardId(cardId: string) : Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.baseUrl}/ActivityLog/${cardId}`);
  }
  getByBoardId(boardId: string, pageNumber: number = 1, pageSize: number = 10): Observable<ActivityLog[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    const url = `${this.baseUrl}/ActivityLog/board/${boardId}`;
    return this.http.get<ActivityLog[]>(url, { params });
  }
}
