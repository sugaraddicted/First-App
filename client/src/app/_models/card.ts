export interface Card{
    id: string;
    name: string;
    description: string;
    priority: number;
    boardListId: string;
    boardId: string;
    dueDate: Date;
    createdAt?: Date;
}