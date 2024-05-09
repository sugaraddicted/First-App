import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { List } from '../_models/list';
import { Card } from '../_models/card';
import { BoardService } from '../_services/board.service';
import { CardService } from '../_services/card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardDto } from '../_models/cardDto';
import * as ListsActions from '../store/actions/lists.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {
  card?: Card;
  lists?: List[];
  priorities = ['Low', 'Medium', 'High'];
  cardForm: FormGroup = new FormGroup({});
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CardModalComponent>, 
    private boardService: BoardService,
    private cardService: CardService,
    private store: Store,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadLists();
  
    if (this.data && this.data.card) {
      this.card = this.data.card;
      this.isEditing = true;
      this.cardForm.patchValue({
        name: this.data.card.name,
        description: this.data.card.description,
        dueDate: this.data.card.dueDate,
        priority: this.getPriorityCaption(this.data.card.priority),
        boardListId: this.data.card.boardListId
      });
    }
    if (this.data && this.data.listId) {
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

  loadLists() {
    this.boardService.getLists().subscribe(lists => this.lists = lists)
  }

  openDatePicker(datePicker: MatDatepicker<Date>) {
    datePicker.open();
  }

  addCard(): void {
    if (this.cardForm) {
      if (this.cardForm.valid) {
        const cardDto: CardDto = {
          name: this.cardForm.value.name,
          description: this.cardForm.value.description,
          dueDate: this.cardForm.value.dueDate,
          priority: this.priorities.indexOf(this.cardForm.value.priority),
          boardListId: this.cardForm.value.boardListId
        };

        this.cardService.addCard(cardDto).subscribe(() => {
          this.dialogRef.close();
          this.reload();
        });
      }
    }
  }

  updateCard(): void {
    if (this.cardForm) {
      if (this.card && this.cardForm.valid) {
        const cardDto: Card = {
          id: this.card.id,
          name: this.cardForm.value.name,
          description: this.cardForm.value.description,
          dueDate: this.cardForm.value.dueDate,
          priority: this.priorities.indexOf(this.cardForm.value.priority),
          boardListId: this.cardForm.value.boardListId
        };

        this.cardService.updateCard(cardDto, cardDto.id).subscribe(() => {
          this.dialogRef.close();
          this.reload();
        });
      }
    }
  }

  reload(): void {
    this.store.dispatch(ListsActions.loadLists());
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
