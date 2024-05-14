import { Board } from "../_models/board";
import { List } from "../_models/list";

export interface BoardsState{
    boards: Board[];
    currentBoard?: Board;
    currentBoardLists?: List[]
    error: string | null;
}