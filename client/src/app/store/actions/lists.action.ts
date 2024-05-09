import { createAction, props } from '@ngrx/store';
import { List } from 'src/app/_models/list';
export const loadLists = createAction('[Lists] Load Lists');
export const loadListsSuccess = createAction('[Lists] Load Lists Success', props<{ lists: List[] }>());
export const loadListsFailure = createAction('[Lists] Load Lists Failure', props<{ error: any }>());

