import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../_models/card';
import { CardDetailsModalComponent } from '../card-details-modal/card-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { List } from '../_models/list';
import { CardService } from '../_services/card.service';
import * as BoardActions from '../store/actions/boards.actions';
import { ListService } from '../_services/list.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/appSate';
import { currentBoardListsSelector } from '../store/selectors/selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() card: Card | undefined;
  @Output() editCardClicked: EventEmitter<Card> = new EventEmitter<Card>();
  lists$: Observable<List[] | undefined>;

  selectedOption: string = ''; 

  constructor(public dialog: MatDialog,
    private store: Store<AppState>, 
    public listService: ListService, 
    public cardService: CardService){
      this.lists$ = this.store.pipe(select(currentBoardListsSelector));
    }

  ngOnInit(): void {
    if (this.card) {
    }
  }

  editCard() {
    this.editCardClicked.emit(this.card);
  }

  deleteCard() {
    if(this.card)
    this.cardService.deleteCard(this.card.id).subscribe({
      next: () => this.card = undefined
    });
  }

  updateCard(listId: string){
    if (this.card) {
      const updatedCard = { ...this.card, boardListId: listId };
      this.store.dispatch(BoardActions.updateCard({ card: updatedCard }));
    }
  }

  openCardDetailsModal(card: Card) {
    this.dialog.open(CardDetailsModalComponent, { data: { listId: card.boardId ,card: card } });
  }
  
  getPriorityCaption(priority: number): string {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return '';
    }
  }
}
