using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Base;

namespace MyTaskBoard.Infrastructure.Repository.Interfaces
{
    public interface IActivityLogRepository : IEntityBaseRepository<ActivityLog>
    {
        Task<IEnumerable<ActivityLog>> GetByCardIdAsync(Guid cardId);

        Task<IEnumerable<ActivityLog>> GetAllPagedAsync(int pageNumber, int pageSize);
    }
}
