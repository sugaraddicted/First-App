using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Infrastructure.Repository
{
    public class BoardListRepository : EntityBaseRepository<BoardList>, IBoardListRepository 
    {
        private readonly DataContext _context;

        public BoardListRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BoardList>> GetByUserIdAsync(Guid userId)
        {
            return await _context.BoardLists.Where(l => l.UserId == userId).ToListAsync();
        }
    }
}
