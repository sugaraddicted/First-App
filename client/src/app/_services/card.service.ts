import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CardDto } from '../_models/cardDto';
import { Card } from '../_models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  
  addCard(cardDto: CardDto){
    return this.http.post(`${this.baseUrl}/Card`, cardDto);
  }

  updateCard(cardDto: Card, cardId: string){
    return this.http.patch(`${this.baseUrl}/Card/${cardId}`, cardDto);
  }

  deleteCard(cardId: string){
    return this.http.delete(`${this.baseUrl}/Card/${cardId}`);
  }
}
