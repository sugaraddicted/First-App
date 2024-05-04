using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityLogController : ControllerBase
    {
        private readonly IActivityLogRepository _activityLogRepository;

        public ActivityLogController(IActivityLogRepository activityLogRepository)
        {
            _activityLogRepository = activityLogRepository;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            var activityLogs = await _activityLogRepository.GetByUserIdAsync(userId);
            return Ok(activityLogs);
        }

        [HttpGet("card/{cardId}")]
        public async Task<IActionResult> GetByCardId(Guid cardId)
        {
            var activityLogs = await _activityLogRepository.GetByCardIdAsync(cardId);
            return Ok(activityLogs);
        }
    }
}
