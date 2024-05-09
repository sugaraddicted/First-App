import { createReducer, createSelector, on } from '@ngrx/store';
import { List } from 'src/app/_models/list';
import * as ListsActions from '../actions/lists.action'

export interface State {
  lists?: List[] | null
}

export const initialState: State = {
  lists: null
};

export const listsReducer = createReducer(
  initialState,
  on(ListsActions.loadListsSuccess, (state, {lists}) => {
    console.log(state, lists);
    return ({ ...state, lists:[...lists]});
    }),
);

export const selectLists = ((state: State) => state.lists);
export const getLists = createSelector(selectLists, (lists) => lists);