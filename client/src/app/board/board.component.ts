import { Component, OnInit } from '@angular/core';
import { BoardService } from '../_services/board.service';
import { List } from '../_models/list';
import { Card } from '../_models/card';
import { ListService } from '../_services/list.service';
import { AddListModel } from '../_models/addListModel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  lists?: List[];
  cards?: Card[];
  addModel = new AddListModel();
  addingList: boolean = false;
  newListTitle: string = '';
  
  constructor(private boardService: BoardService, 
    private listService: ListService,
  private store: Store){}

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(){
    this.boardService.getLists().subscribe(lists => this.lists = lists)
  }

  toggleAddingList() {
      this.addingList = !this.addingList;
      if (!this.addingList) {
          // Clear the input field when toggling back
          this.newListTitle = '';
      }
  }

  addList() {
    if(this.addModel)
      this.listService.addList(this.addModel).subscribe({
        next: () => {
          this.loadLists();
          this.newListTitle = '';
          this.addingList = false;
        },
        error: error => console.log(error)
      });
  }

  cancelAddList() {
      this.newListTitle = '';
      this.addingList = false;
  }
}
