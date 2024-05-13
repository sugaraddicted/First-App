import { List } from "./list";

export interface Board{
    id: string,
    name: string,
    createdAt: Date,
    lists: List[]
}