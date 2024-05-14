import { createAction, props } from '@ngrx/store'; 
import { Board } from 'src/app/_models/board';
import { Card } from 'src/app/_models/card';
import { List } from 'src/app/_models/list';

export const loadBoards = createAction('[Board] Load Boards'); 
export const loadBoardsSuccess = createAction('[Board] Load Boards Success', props<{ boards: Board[] }>()); 
export const loadBoardsFailure = createAction('[Board] Load Boards Failure', props<{ error: string }>());

export const selectBoard = createAction(
    '[Board] Select Board',
    props<{ boardId: string }>() 
);

export const selectBoardSuccess = createAction(
    '[Board] Select Board Success',
    props<{ board: Board }>()
);

export const selectBoardFailure = createAction(
    '[Board] Select Board Failure',
    props<{ error: any }>() 
);


export const clearCurrentBoard = createAction('[Board] Clear Current Board');

export const addBoard = createAction('[Board] Add Board', props<{ title: string }>()); 
export const addBoardSuccess = createAction('[Board] Add Board Success', props<{ board: Board }>()); 
export const addBoardFailure = createAction('[Board] Add Board Failure', props<{ error: any }>());

export const deleteBoard = createAction('[Board] Delete Board', props<{ boardId: string }>()); 
export const deleteBoardSuccess = createAction('[Board] Delete Board Success', props<{ boardId: string }>()); 
export const deleteBoardFailure = createAction('[Board] Delete Board Failure', props<{ error: any }>());

export const updateBoard = createAction('[Board] update Board', props<{ board: Board }>()); 
export const updateBoardSuccess = createAction('[Board] Update Board Success', props<{ board: Board }>()); 
export const updateBoardFailure = createAction('[Board] Update Board Failure', props<{ error: any }>());

export const loadBoardLists = createAction('[List] Load Board Lists', props<{ boardId: string }>());
export const loadBoardListsSuccess = createAction('[List] Load Board Lists Success', props<{ lists: List[] }>());
export const loadBoardListsFailure = createAction('[List] Load Board Lists Failure', props<{ error: any }>());

export const updateCard = createAction('[Card] Update Card', props<{ card: Card }>());
export const updateCardSuccess = createAction('[Card] Update Card Success', props<{ card: Card }>());
export const updateCardFailure = createAction('[Card] Update Card Failure', props<{ error: any }>());

export const updateList = createAction('[Card] Update List', props<{ list: List }>());
export const updateListSuccess = createAction('[Card] Update List Success', props<{ list: List }>());
export const updateListFailure = createAction('[Card] Update List Failure', props<{ error: any }>());