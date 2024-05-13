export class AddListModel{
    name:string;
    boardId: string;
    constructor(
        name:string,
        boardId: string){
        this.name = name;
        this.boardId = boardId;
    }
}