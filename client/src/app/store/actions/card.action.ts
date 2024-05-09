import { Action } from '@ngrx/store';
import { Card } from '../../_models/card';

export enum CardActionType {
    ADD_ITEM = '[CARD] Add CARD',
}

export class AddCardAction implements Action {

    readonly type = CardActionType.ADD_ITEM;
    constructor(public payload: Card) {}
  
}

export type CardAction = AddCardAction;