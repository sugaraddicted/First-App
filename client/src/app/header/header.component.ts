import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from '../_models/board';
import * as BoardActions from '../store/actions/boards.actions';
import { boardsSelector, currentBoardSelector } from '../store/selectors/selectors';
import { AppState } from '../store/appSate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleActivityMenu = new EventEmitter<void>();
  @Output() boardSelected = new EventEmitter<string>();
  @Input() currentBoardId?: string;

  boards$ = this.store.select(boardsSelector);
  currentBoard$ = this.store.select(currentBoardSelector);
  currentBoard?: Board;
  isEditing = false;
  newBoardTitle: string = '';
  addingBoard: boolean = false;
  isBoardSelected: boolean = false;
  editedBoardTitle: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards());
    this.store.select(currentBoardSelector).subscribe(board => {
      this.currentBoard = board;
      if(this.currentBoard && this.currentBoard.name){
        this.isBoardSelected = true;
        this.editedBoardTitle = this.currentBoard.name;
      }
    });
  }

  onToggleActivityMenu() {
    this.toggleActivityMenu.emit();
  }

  onSelectBoard(boardId: string) {
    this.store.dispatch(BoardActions.selectBoard({ boardId }));
    this.boardSelected.emit(boardId);
    this.isBoardSelected = true;
  }

  onAddBoard() {
    if (this.newBoardTitle) {
      this.store.dispatch(BoardActions.addBoard({ title: this.newBoardTitle }));
      this.currentBoard$ = this.store.select(currentBoardSelector);
      this.isBoardSelected = true;
      this.newBoardTitle = '';
      this.addingBoard = false;
    }
  }

  onDeleteBoard() {
    if (this.currentBoardId) {
      this.isBoardSelected = false;
      this.store.dispatch(BoardActions.deleteBoard({ boardId: this.currentBoardId }));
      this.currentBoard = undefined;
    }
  }

  onSaveEdit() {
    if (this.currentBoard && this.editedBoardTitle.trim()) {
      const updatedBoard: Board = {
        ...this.currentBoard,
        name: this.editedBoardTitle.trim()
      };
      this.store.dispatch(BoardActions.updateBoard({ board: updatedBoard }));
      this.isEditing = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    if(this.currentBoard)
    this.editedBoardTitle = this.currentBoard?.name;
  }
 
  cancelAdding() {
    this.addingBoard = false;
    this.newBoardTitle = '';
  }

  toggleAddingBoard() {
    this.addingBoard = !this.addingBoard;
  }
}
