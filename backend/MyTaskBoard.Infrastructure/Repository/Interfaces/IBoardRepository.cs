using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Base;

namespace MyTaskBoard.Infrastructure.Repository.Interfaces
{
    public interface IBoardRepository : IEntityBaseRepository<Board>
    {
    }
}
