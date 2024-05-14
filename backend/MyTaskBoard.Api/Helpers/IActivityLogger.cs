using MyTaskBoard.Api.Dto;
using MyTaskBoard.Core.Entity;

namespace MyTaskBoard.Api.Helpers
{
    public interface IActivityLogger
    {
        Task LogOnCreate(Card card, string listName);
        Task LogOnDelete(Card card);
        Task LogOnUpdate(Card existingCard, UpdateCardDto newCard);
    }
}
