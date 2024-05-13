import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ListsActions from '../app/store/actions/lists.action'
import { Board } from './_models/board';
import { BoardService } from './_services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() boardSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() boardCreated: EventEmitter<string> = new EventEmitter<string>();
  @Output() boardDeleted: EventEmitter<void> = new EventEmitter<void>();
  boards?: Board[];
  newBoardTitle?: string;
  currentBoardId: string| null = null;
  currentBoard?: Board;
  constructor(private store: Store, 
    private boardService: BoardService){}

  ngOnInit(): void { 
    this.currentBoardId = localStorage.getItem('currentBoardId'); 
    this.loadBoards();
    this.getBoard();
  }

  title = 'My Task Boards';
  activityMenuOpen: boolean = false;

  toggleActivityMenu() {
    this.activityMenuOpen = !this.activityMenuOpen;
  }

  loadBoards() {
    this.boardService.getBoards().subscribe(boards => this.boards = boards)
  }

  getBoard(){
    if (this.currentBoardId) {
      this.boardService.getById(this.currentBoardId).subscribe(board => this.currentBoard = board);
    }
  }

  closeSidebar() {
    this.activityMenuOpen = false;
  }

  onBoardSelected(boardId: string) {
    this.currentBoardId = boardId;
    localStorage.setItem('currentBoardId', boardId);
    this.getBoard();
    this.boardSelected.emit(boardId);
  }

  onBoardDeleted() {
    localStorage.removeItem('currentBoardId');
    this.currentBoardId = null;
    this.currentBoard = undefined;
    this.boardDeleted.emit();
  }

  addBoard() {
    if (this.newBoardTitle) {
      this.boardService.addBoard(this.newBoardTitle).subscribe({
        next: (boardId: string) => {
          this.currentBoardId = boardId;
          localStorage.setItem('currentBoardId', boardId);
          this.getBoard();
          this.newBoardTitle = '';
          this.loadBoards();
        },
        error: error => console.log(error)
      });
    }
  } 
}
