import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../_models/board';
import { List } from '../_models/list';
import * as BoardActions from '../store/actions/boards.actions';
import { ListService } from '../_services/list.service';
import { currentBoardListsSelector, currentBoardSelector } from '../store/selectors/selectors';
import { AddListModel } from '../_models/addListModel';
import { AppState } from '../store/appSate';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board$: Observable<Board | undefined>;
  lists$: Observable<List[] | undefined>;
  addingList: boolean = false;
  newListTitle: string = '';

  constructor(
    private store: Store<AppState>,
    private listService: ListService
  ) {
    this.board$ = this.store.pipe(select(currentBoardSelector));
    this.lists$ = this.store.pipe(select(currentBoardListsSelector));
  }

  ngOnInit(): void {
    this.board$.subscribe(board => {
      if (board) {
        this.store.dispatch(BoardActions.loadBoardLists({ boardId: board.id }));
      }
    });
  }

  toggleAddingList() {
    this.addingList = !this.addingList;
    if (!this.addingList) {
      this.newListTitle = '';
    }
  }

  addList() {
    this.board$.subscribe(board => {
      if (board && this.newListTitle) {
        this.listService.addList(new AddListModel(this.newListTitle, board.id)).subscribe({
          next: () => {
            this.store.dispatch(BoardActions.loadBoardLists({ boardId: board.id }));
            this.newListTitle = '';
            this.addingList = false;
          },
          error: error => console.log(error)
        });
      }
    }).unsubscribe();
  }

  cancelAddList() {
    this.newListTitle = '';
    this.addingList = false;
  }
}
