import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BoardService } from 'src/app/_services/board.service';
import { ListService } from 'src/app/_services/list.service';
import * as ListsActions from '../actions/lists.action';
import { of } from 'rxjs';


@Injectable()
export class ListsEffects {
  loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.loadLists),
      mergeMap(action =>
        this.boardService.getLists().pipe(
          map(lists => ListsActions.loadListsSuccess({ lists }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService
  ) {}
}