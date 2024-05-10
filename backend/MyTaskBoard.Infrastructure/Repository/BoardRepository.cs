using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Infrastructure.Repository
{
    public class BoardRepository : EntityBaseRepository<Board>, IBoardRepository
    {
        public BoardRepository(DataContext context) : base(context)
        {
        }
    }
}
