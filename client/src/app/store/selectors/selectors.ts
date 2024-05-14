import { createSelector } from "@ngrx/store";
import { AppState } from "../appSate";

export const selectFeature = (state: AppState) => state.boards;

export const  currentBoardSelector = createSelector(
    selectFeature, 
    (state) => state.currentBoard
);

export const boardsSelector = createSelector(
    selectFeature, 
    (state) => state.boards
);

export const currentBoardListsSelector = createSelector(
    selectFeature, 
    (state) => state.currentBoardLists
);

export const errorSelector = createSelector(
    selectFeature, 
    (state) => state.error
);