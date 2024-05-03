using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Base;

namespace MyTaskBoard.Infrastructure.Repository.Interfaces
{
    public interface ICardRepository : IEntityBaseRepository<Card>
    {
        Task<IEnumerable<Card>> GetByBoardListIdAsync(Guid  listId);
    }
}
