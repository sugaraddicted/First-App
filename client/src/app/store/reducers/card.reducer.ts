import { Card } from "src/app/_models/card";
import { CardAction, CardActionType } from "../actions/card.action";

const initialState: Array<Card> = [
  {
    id: '1',
    name: 'Angular State Management with NgRx',
    description: 'description',
    priority: 1,
    boardListId: '9693f550-acb1-43e3-af56-7986e947ef38',
    dueDate: new Date(),
    createdAt: new Date()
  },
];

export function CardReducer(
   state: Array<Card> = initialState,
   action: CardAction
) {
   switch (action.type) {
     case CardActionType.ADD_ITEM:
       return [...state, action.payload];
     default:
       return state;
   }
}