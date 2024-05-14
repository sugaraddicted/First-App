import { createReducer, on } from '@ngrx/store';
import * as BoardActions from '../actions/boards.actions';
import { BoardsState } from 'src/app/store/BoardsState';

export const initialState: BoardsState = {
    boards: [],
    currentBoard: undefined,
    error: null,
};

export const boardReducer = createReducer(
    initialState,

    on(BoardActions.loadBoardListsSuccess, (state, { lists }) => ({
      ...state,
      currentBoardLists: lists
    })),

    on(BoardActions.clearCurrentBoard, (state) => ({
       ...state, 
       currentBoard: undefined 
    })),

    on(BoardActions.loadBoardsSuccess, (state, action) => ({
      ...state,
      boards: action.boards,
      error: null
    })),

    on(BoardActions.loadBoardsFailure, (state, { error }) => ({
      ...state,
      boards: [],
      error
    })),

    on(BoardActions.selectBoardSuccess, (state, { board }) => ({
      ...state,
      currentBoard: board,
      error: null
    })),

    on(BoardActions.selectBoardFailure, (state, { error }) => ({
      ...state,
      currentBoardId: null,
      error
    })),

    on(BoardActions.addBoardSuccess, (state, { board }) => ({
      ...state,
      boards: [...state.boards, board],
      error: null
    })),

    on(BoardActions.addBoardFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(BoardActions.deleteBoardSuccess, (state, { boardId }) => ({
      ...state,
      boards: state.boards.filter(b => b.id !== boardId),
      error: null
    })),

    on(BoardActions.deleteBoardFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(BoardActions.updateBoardSuccess, (state, { board }) => ({
      ...state,
      boards: state.boards.map(b => (b.id === board.id ? { ...b, ...board } : b)),
      error: null
    })),

    on(BoardActions.updateBoardFailure, (state, { error }) => ({
      ...state,
      error
    })),
    
    on(BoardActions.updateCardSuccess, (state, { card }) => ({
      ...state,
      currentBoardLists: state.currentBoardLists?.map(list =>
          list.id === card.boardListId ? {
              ...list,
              cards: list.cards?.map(c => c.id === card.id ? card : c)
          } : list
      )
    })),

    on(BoardActions.updateListSuccess, (state, { list }) => ({
      ...state,
      currentBoardLists: state.currentBoardLists?.map(l => l.id === list.id ? { ...l, ...list } : l),
      error: null
    })),
  );