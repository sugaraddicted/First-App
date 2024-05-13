import { Component, Inject, Input, OnInit } from '@angular/core';
import { List } from '../_models/list';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { Card } from '../_models/card';
import { ListService } from '../_services/list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  @Input() list: List | undefined;
  isEditing: boolean = false;
  editedListTitle: string = '';

  constructor(public dialog: MatDialog, 
    private listService: ListService) { }

  ngOnInit(): void {

  }

  editListTitle() {
    this.isEditing = true;
    this.editedListTitle = this.list?.name || '';
  }

  saveEdit() {
    if (this.editedListTitle.trim() === '') {
      return;
    }
  
    this.list!.name = this.editedListTitle.trim();
    if(this.list){
      this.listService.updateList(this.list).subscribe({
        next: () => this.isEditing = false,
        error: error => {
          console.error('Error updating list:', error)
        }});
    }
    
  }
  
  delete() {
    if (!this.list) {
      return;
    }
    this.listService.deleteList(this.list.id).subscribe({
      next: () => {
        this.list = undefined;
      },
      error: (error) => {
        console.error('Error deleting list:', error);
      }
    }
    );
  }
  
  cancelEdit() {
    this.isEditing = false;
    this.editedListTitle = '';
  }

  openAddCardModal() {
    if(this.list && this.list.id){
      const dialogRef = this.dialog.open(CardModalComponent, {
      data: { listId: this.list.id }
    });
    
    dialogRef.afterClosed().subscribe((result: Card | undefined) => {
      if (result) {
      }
    });}
  }
  
  openEditCardModal(card: Card) {
    if(this.list)
    this.dialog.open(CardModalComponent, {
      data: { listId: card.boardListId, card: card}
    });
  }
}
