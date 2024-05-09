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

        public override async Task<IEnumerable<BoardList>> GetAllAsync()
        {
            var lists = await _context.BoardLists.Include(b => b.Cards).ToListAsync();
            foreach (var list in lists)
            {
                list.Cards.OrderByDescending(c => c.DueDate);
            }
            return lists.OrderBy(l => l.CreatedAt);
        }
    }
}
