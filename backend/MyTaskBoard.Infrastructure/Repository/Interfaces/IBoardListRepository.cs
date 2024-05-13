using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Base;

namespace MyTaskBoard.Infrastructure.Repository.Interfaces
{
    public interface IBoardListRepository : IEntityBaseRepository<BoardList>
    {
        Task<IEnumerable<BoardList>> GetByBoardIdAsync(Guid  boardId);
    }
}
