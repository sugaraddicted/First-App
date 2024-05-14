import { Injectable } from '@angular/core';
import { Observable, catchError, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Board } from '../_models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;

  getBoards() : Observable<Board[]> {
    return this.http.get<Board[]>(`${this.baseUrl}/Board`);
  }

  getById(boardId: string) : Observable<Board> {
    return this.http.get<Board>(`${this.baseUrl}/Board/${boardId}`);
  }

  addBoard(title: string): Observable<Board> {;
    return this.http.post<Board>(this.baseUrl + `/Board/${title}`, title).pipe(
      map(board => {
        return board;
      })
    );
  }

  updateBoard(board: Board){
    return this.http.patch(`${this.baseUrl}/Board/${board.id}`, board);
  }

  deleteBoard(boardId: string){
    return this.http.delete(`${this.baseUrl}/Board/${boardId}`);
  }

}
