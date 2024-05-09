using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Infrastructure.Repository
{
    public class CardRepository : EntityBaseRepository<Card>, ICardRepository 
    {
        private readonly DataContext _context;

        public CardRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Card>> GetByBoardListIdAsync(Guid listId)
        {
            return await _context.Cards.Where(c => c.BoardListId == listId).ToListAsync();
        }
    }
}
