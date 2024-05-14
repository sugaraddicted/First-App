import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, of, switchMap, take, tap } from "rxjs";
import * as BoardActions from '../actions/boards.actions';
import { BoardService } from "src/app/_services/board.service";
import { Board } from 'src/app/_models/board';
import { AppState } from "../appSate";
import { Store } from "@ngrx/store";
import { ListService } from "src/app/_services/list.service";
import { CardService } from "src/app/_services/card.service";

@Injectable()
export class BoardsEffects {

    selectBoard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.selectBoard),
            mergeMap(action =>
                this.boardsService.getById(action.boardId)
                    .pipe(
                        map(board => BoardActions.selectBoardSuccess({ board })),
                        catchError(error => of(BoardActions.selectBoardFailure({ error: error.message })))
                    )
            )
        )
    );

    storeSelectedBoardId$ = createEffect(() => 
        this.actions$.pipe(
          ofType(BoardActions.selectBoard),
          tap(action => localStorage.setItem('currentBoardId', action.boardId))
        ),
        { dispatch: false }
    );

    getBoards$ = createEffect(() => 
        this.actions$.pipe(
            ofType(BoardActions.loadBoards),
            mergeMap(() =>
                this.boardsService.getBoards()
                    .pipe(
                        map(boards => BoardActions.loadBoardsSuccess({ boards })),
                        catchError(error => of(BoardActions.loadBoardsFailure({ error: error.message })))
                    )
            )
        )
    );

    addBoard$ = createEffect(() =>
        this.actions$.pipe(
          ofType(BoardActions.addBoard),
          mergeMap(action =>
            this.boardsService.addBoard(action.title).pipe(
              switchMap(board => [
                BoardActions.addBoardSuccess({ board }),
                BoardActions.selectBoard({ boardId: board.id }) 
              ]),
              catchError(error => of(BoardActions.addBoardFailure({ error: error.message })))
            )
          )
        )
    );

    updateBoard$ = createEffect(() =>
        this.actions$.pipe(
          ofType(BoardActions.updateBoard),
          mergeMap(action =>
            this.boardsService.updateBoard(action.board).pipe(
              switchMap(board => [
                BoardActions.updateBoardSuccess({ board: action.board }),
                BoardActions.selectBoard({ boardId: action.board.id })  // Ensure the board ID is set correctly
              ]),
              catchError(error => of(BoardActions.updateBoardFailure({ error: error.message })))
            )
          )
        )
    );

    deleteBoard$ = createEffect(() =>
        this.actions$.pipe(
          ofType(BoardActions.deleteBoard),
          mergeMap(action =>
            this.boardsService.deleteBoard(action.boardId).pipe(
              switchMap(() => [
                BoardActions.deleteBoardSuccess({ boardId: action.boardId }),
                BoardActions.clearCurrentBoard()
              ]),
              catchError(error => of(BoardActions.deleteBoardFailure({ error: error.message })))
            )
          )
        )
    );

    loadLists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.loadBoardLists),
            mergeMap(action =>
                this.listService.getListsByBoardId(action.boardId).pipe(
                    map(lists => BoardActions.loadBoardListsSuccess({ lists })),
                    catchError(error => of(BoardActions.loadBoardListsFailure({ error })))
                )
            )
        )
    );

    updateCard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.updateCard),
            exhaustMap(action =>
                this.cardsService.updateCard(action.card, action.card.id).pipe(
                    switchMap(updatedCard => [
                        BoardActions.updateCardSuccess({ card: action.card }),
                        BoardActions.loadBoardLists({ boardId: action.card.boardId })
                    ]),
                    catchError(error => of(BoardActions.updateCardFailure({
                        error: error.message
                    })))
                )
            )
        )
    );
    
    updateList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.updateList),
            exhaustMap(action =>
                this.listService.updateList(action.list).pipe(
                    switchMap(updatedList => [
                        BoardActions.updateListSuccess({ list: action.list }),
                        BoardActions.loadBoardLists({ boardId: action.list.boardId })
                    ]),
                    catchError(error => of(BoardActions.updateListFailure({
                        error: error.message
                    })))
                )
            )
        )
    );

    constructor(private actions$: Actions, 
        private boardsService: BoardService,
        private listService: ListService,
        private cardsService: CardService) {}
}
