import { Card } from "./card";

export interface List{
    id: string,
    name: string,
    createdAt: Date,
    cards?: Card[],
    boardId: string
}