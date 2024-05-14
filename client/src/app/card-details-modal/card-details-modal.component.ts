import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { List } from '../_models/list';
import { Card } from '../_models/card';
import * as BoardActions from '../store/actions/boards.actions';
import { ActivityService } from '../_services/activity.service';
import { ActivityLog } from '../_models/activityLog';
import { CardService } from '../_services/card.service';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { ListService } from '../_services/list.service';
import { AppState } from '../store/appSate';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-card-details-modal',
  templateUrl: './card-details-modal.component.html',
  styleUrls: ['./card-details-modal.component.css']
})
export class CardDetailsModalComponent implements OnInit {
  @Output() editCardClicked: EventEmitter<Card> = new EventEmitter<Card>();
  card?: Card;
  lists?: List[];
  activityLogs?: ActivityLog[];
  cardName = '';
  selectedList?: string;
  dueDate?: Date;
  selectedPriority= '';

  constructor(
    public dialogRef: MatDialogRef<CardDetailsModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private listService: ListService,
    private activityService: ActivityService,
    public cardService: CardService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.card = this.data.card;
    this.loadLists();
    this.loadActivityLogs();
    if(this.card){
      this.selectedList = this.card.boardListId;
      this.selectedPriority = this.getPriorityCaption(this.card.priority);
    }
  }

  editCard() {
    if(this.card)
    this.openEditCardModal(this.card);
    this.close();
  }

  updateCard(listId: string){
    if (this.card) {
      const updatedCard = { ...this.card, boardListId: listId };
      this.store.dispatch(BoardActions.updateCard({ card: updatedCard }));
    }
  }

  loadLists(){
    if(this.card)
    this.listService.getListsByBoardId(this.card.boardId).subscribe(lists => this.lists = lists)
  }

  loadActivityLogs(){
    if(this.card)
      this.activityService.getByCardId(this.card.id).subscribe({
    next: activityLogs => this.activityLogs = activityLogs,
    error: error => console.log(this.activityLogs)
    });
  }

  close() {
    this.dialogRef.close();
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

  openEditCardModal(card: Card) {
    this.dialog.open(CardModalComponent, {
      data: {listId: card.boardListId, card: card }
    });
  }
}
