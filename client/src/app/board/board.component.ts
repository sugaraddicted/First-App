import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BoardService } from '../_services/board.service';
import { List } from '../_models/list';
import { Card } from '../_models/card';
import { ListService } from '../_services/list.service';
import { AddListModel } from '../_models/addListModel';
import { Store } from '@ngrx/store';
import { Board } from '../_models/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() boardId?: string | null = null;
  board?: Board;
  lists?: List[];
  cards?: Card[];
  addingList: boolean = false;
  newListTitle: string = '';
  
  constructor(private boardService: BoardService, 
    private listService: ListService,
    private store: Store){}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['boardId'] && this.boardId) {
      this.getBoard(this.boardId);
      this.loadLists();
    }
  }

  loadLists(){
    if(this.boardId)
    this.listService.getListsByBoardId(this.boardId).subscribe(lists => this.lists = lists)
  }

  getBoard(boardId: string){
    if(this.boardId)
    this.boardService.getById(this.boardId).subscribe(board => this.board = board)
  }

  toggleAddingList() {
      this.addingList = !this.addingList;
      if (!this.addingList) {
          this.newListTitle = '';
      }
  }

  addList() {
    if(this.board){
      this.listService.addList(new AddListModel(this.newListTitle, this.board.id)).subscribe({
        next: () => {
          this.loadLists();
          this.newListTitle = '';
          this.addingList = false;
        },
        error: error => console.log(error)
      });
    }
  }

  cancelAddList() {
      this.newListTitle = '';
      this.addingList = false;
  }
}
