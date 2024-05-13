import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BoardService } from '../_services/board.service';
import { Board } from '../_models/board';
import { union } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() toggleActivityMenu: EventEmitter<void> = new EventEmitter<void>();
  @Output() boardSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() boardDeleted: EventEmitter<void> = new EventEmitter<void>();
  isBoardSelected = false;
  @Input() currentBoardId: string | null = null;
  isEditing = false;
  addingBoard = false;
  editedBoardTitle?: string;
  newBoardTitle?: string;
  currentBoard?: Board;
  boards?: Board[];
  selectedBoardName = this.boards?.find(board => board.id === this.currentBoardId)?.name || '';

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.loadBoards();
    this.getBoard();
  }

  loadBoards() {
    this.boardService.getBoards().subscribe(boards => this.boards = boards)
  }

  onToggleActivityMenu() {
    this.toggleActivityMenu.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentBoardId'] && this.currentBoardId) {
      this.loadBoards();
      this.isBoardSelected = true;
    }
  }

  saveEdit(){
    if(this.currentBoard && this.editedBoardTitle){
      console.log(this.editedBoardTitle);
      this.currentBoard.name = this.editedBoardTitle;
      this.boardService.updateBoard(this.currentBoard).subscribe({
      next: _ => {
        this.loadBoards();
        console.log(this.editedBoardTitle);
        this.isEditing = false;
      } 
    });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedBoardTitle = '';
  }

  cancelAdding() {
    this.addingBoard = false;
    this.newBoardTitle = '';
  }

  delete(){
    if(this.currentBoardId)
    this.boardService.deleteBoard(this.currentBoardId).subscribe({
      next: _ => {
        this.onBoardDeleted();
      }
    });
  }

  addBoard() {
    if (this.newBoardTitle) {
      this.boardService.addBoard(this.newBoardTitle).subscribe({
        next: (boardId: string) => {
          this.onBoardSelected(boardId);
          this.newBoardTitle = '';
          this.addingBoard = false;
          this.loadBoards();
        },
        error: error => console.log(error)
      });
    }
  }

  toggleAddingBoard() {
    this.addingBoard = !this.addingBoard;
    if (!this.addingBoard) {
        this.newBoardTitle = '';
    }
  }

  getBoard(){
    if(this.currentBoardId)
    this.boardService.getById(this.currentBoardId).subscribe({
      next: board => this.currentBoard = board
    });
  }

  onBoardSelected(boardId: string) {
    this.isBoardSelected = true;
    this.boardSelected.emit(boardId);
    this.currentBoardId = boardId;
    this.getBoard();
  }

  onBoardDeleted(){
    this.isBoardSelected = false;
    this.currentBoard = undefined;
    this.currentBoardId = null;
    this.loadBoards();
    this.boardDeleted.emit();
  }
}