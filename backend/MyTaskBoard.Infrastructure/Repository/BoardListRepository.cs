using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Infrastructure.Repository
{
    public class BoardListRepository : EntityBaseRepository<BoardList>, IBoardListRepository 
    {
        public BoardListRepository(DataContext context) : base(context)
        {
        }
    }
}
