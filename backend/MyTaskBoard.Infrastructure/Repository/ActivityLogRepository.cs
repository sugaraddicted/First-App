using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Infrastructure.Repository
{
    public class ActivityLogRepository : EntityBaseRepository<ActivityLog>, IActivityLogRepository 
    {
        private readonly DataContext _context;

        public ActivityLogRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ActivityLog>> GetByBoardIdAsync(int pageNumber, int pageSize, Guid boardId)
        {
            var query = _context.ActivityLogs
                .Where(al => al.BoardId == boardId)
                .OrderByDescending(al => al.Timestamp)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<ActivityLog>> GetByCardIdAsync(Guid cardId)
        {
            return await _context.ActivityLogs.Where(al => al.CardId == cardId).ToListAsync();
        }
    }
}
