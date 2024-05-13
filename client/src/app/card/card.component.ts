import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../_models/card';
import { CardDetailsModalComponent } from '../card-details-modal/card-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { List } from '../_models/list';
import { CardService } from '../_services/card.service';
import { Router } from '@angular/router';
import { ListService } from '../_services/list.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() card: Card | undefined;
  @Output() editCardClicked: EventEmitter<Card> = new EventEmitter<Card>();
  lists?: List[];

  selectedOption: string = ''; 

  constructor(public dialog: MatDialog, 
    public listService: ListService, 
    public cardService: CardService, 
    public router: Router){}
  ngOnInit(): void {
    this.loadLists();
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
      this.card.boardListId = listId;
      this.cardService.updateCard(this.card, this.card.id).subscribe(() => {
      });
    }
    this.reloadPage();
  }

  openCardDetailsModal(card: Card) {
    this.dialog.open(CardDetailsModalComponent, { data: { listId: card.boardId ,card: card } });
  }

  reloadPage(): void {
    location.reload();
  }

  loadLists(){
    if(this.card)
      this.listService.getListsByBoardId(this.card.boardId).subscribe(lists => this.lists = lists)
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
