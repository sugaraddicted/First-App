export interface ActivityLog{
    id: string,
    cardId: string,
    action: string,
    cardName: string,
    before: string,
    after: string,
    timestemp: Date
}