import { HttpClient } from '@angular/common/http';
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
  
  getActivityLogsByCardId(cardId: string) : Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.baseUrl}/ActivityLog/${cardId}`);
  }
  getActivityLogs(pageNumber?: number, pageSize?: number) : Observable<ActivityLog[]> {
    const url = pageNumber && pageSize ? `${this.baseUrl}/ActivityLog?pageNumber=${pageNumber}&pageSize=${pageSize}` : `${this.baseUrl}/ActivityLog`;
    return this.http.get<ActivityLog[]>(url);
  }
}
