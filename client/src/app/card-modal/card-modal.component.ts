import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { List } from '../_models/list';
import { Card } from '../_models/card';
import { CardService } from '../_services/card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardDto } from '../_models/cardDto';
import * as BoardActions from '../store/actions/boards.actions';
import { Store } from '@ngrx/store';
import { ListService } from '../_services/list.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {
  card?: Card;
  lists?: List[];
  boardId = '';
  priorities = ['Low', 'Medium', 'High'];
  cardForm: FormGroup = new FormGroup({});
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>, 
    private listService: ListService,
    private cardService: CardService,
    private store: Store,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { listId: string, card?: Card }
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadList();
    
    if (this.data && this.data.card) {
      this.card = this.data.card;
      this.isEditing = true;
      this.cardForm.patchValue({
        name: this.data.card.name,
        description: this.data.card.description,
        dueDate: this.data.card.dueDate,
        priority: this.getPriorityCaption(this.data.card.priority),
        boardListId: this.data.card.boardListId,
        boardId: this.data.card.boardId
      });
    }
    if (this.data.listId) {
      this.cardForm.patchValue({
        boardListId: this.data.listId
      });
    }
  }
  
  createForm() {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [new Date()],
      priority: ['', Validators.required],
      boardListId: ['', Validators.required]
    });
  }
  
  close(): void {
    this.dialogRef.close();
  }

  loadList() {
    if(this.data.listId){
      this.listService.getById(this.data.listId).subscribe({
        next: list => this.loadLists(list.boardId),
        error: error => console.error(error)
      });
    }
  }

  loadLists(boardId: string) {
    if(boardId){
      this.listService.getListsByBoardId(boardId).subscribe({
        next: lists => this.lists = lists,
        error: error => console.error(error)
      });
    }
  }

  openDatePicker(datePicker: MatDatepicker<Date>) {
    datePicker.open();
  }

  addCard(): void {
    if (this.cardForm) {
      if (this.cardForm.valid && this.lists) {
        const cardDto: CardDto = {
          name: this.cardForm.value.name,
          description: this.cardForm.value.description,
          dueDate: this.cardForm.value.dueDate,
          priority: this.priorities.indexOf(this.cardForm.value.priority),
          boardListId: this.cardForm.value.boardListId,
          boardId: this.lists[0].boardId,
        };
        this.cardService.addCard(cardDto).subscribe(() => {
          this.reload();
          this.dialogRef.close();
        });
      }
    }
  }

  updateCard(): void {
    if (this.cardForm) {
      if (this.card && this.cardForm.valid && this.lists) {
        const cardDto: Card = {
          id: this.card.id,
          name: this.cardForm.value.name,
          description: this.cardForm.value.description,
          dueDate: this.cardForm.value.dueDate,
          priority: this.priorities.indexOf(this.cardForm.value.priority),
          boardListId: this.cardForm.value.boardListId,
          boardId: this.lists[0].boardId,
        };
        this.cardService.updateCard(cardDto, cardDto.id).subscribe(() => {
          this.reload();
          this.dialogRef.close();
        });
      }
    }
  }

  reload(): void {
    if(this.lists)
    this.store.dispatch(BoardActions.loadBoardLists({boardId: this.lists[0].boardId}));
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
