import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as BoardActions from './store/actions/boards.actions';
import { Board } from './_models/board';
import { Observable, map, take } from 'rxjs';
import { boardsSelector, currentBoardSelector } from './store/selectors/selectors';
import { AppState } from './store/appSate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  boards$?: Observable<Board[]>;
  currentBoard$?: Observable<Board | undefined>;
  currentBoardId?: string;
  title = 'My Task Boards';
  activityMenuOpen: boolean = false;
  newBoardTitle: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    
    this.store.dispatch(BoardActions.loadBoards());
    this.boards$ = this.store.pipe(select(boardsSelector));
    const storedBoardId = localStorage.getItem('currentBoardId');
    if (storedBoardId) {
      this.store.dispatch(BoardActions.selectBoard({ boardId: storedBoardId }));
    }
    this.currentBoard$ = this.store.pipe(select(currentBoardSelector));
  }

  toggleActivityMenu() {
    this.activityMenuOpen = !this.activityMenuOpen;
  }

  onBoardSelected(boardId: string) {
    localStorage.setItem('currentBoardId', boardId);
    this.store.dispatch(BoardActions.selectBoard({ boardId }));
    this.currentBoard$?.subscribe(board => this.currentBoardId = board?.id);
    this.store.subscribe(store => this.currentBoardId = store.boards.currentBoard?.id).unsubscribe;
  }

  onBoardDeleted() {
    if(this.currentBoard$){
      this.currentBoard$.pipe(
        take(1),
        map(currentBoard => {
            if (currentBoard && currentBoard.id) {
                this.store.dispatch(BoardActions.deleteBoard({ boardId: currentBoard.id }));
                localStorage.removeItem('currentBoardId');
            }
        })
    ).subscribe();
    }
  }

  closeSidebar() {
    this.activityMenuOpen = false;
  }

  addBoard() {
    if (this.newBoardTitle) {
        this.store.dispatch(BoardActions.addBoard({ title: this.newBoardTitle }));
        this.newBoardTitle = '';
    }
  }
}
