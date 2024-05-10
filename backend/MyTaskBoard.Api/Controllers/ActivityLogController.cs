using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityLogController : ControllerBase
    {
        private readonly IActivityLogRepository _activityLogRepository;
        private readonly IMapper _mapper;

        public ActivityLogController(IActivityLogRepository activityLogRepository, IMapper mapper)
        {
            _activityLogRepository = activityLogRepository;
            _mapper = mapper;
        }

        [HttpGet("{cardId}")]
        public async Task<IActionResult> GetByCardId(Guid cardId)
        {
            var activityLogs = await _activityLogRepository.GetByCardIdAsync(cardId);
            var activityLogDtos = _mapper.Map<IEnumerable<ActivityLogDto>>(activityLogs);
            return Ok(activityLogDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetByBoardId(Guid boardId, int pageNumber = 1, int pageSize = 10)
        {
            var activityLogs = await _activityLogRepository.GetByBoardIdAsync(pageNumber, pageSize, boardId);
            var activityLogDtos = _mapper.Map<IEnumerable<ActivityLogDto>>(activityLogs);
            return Ok(activityLogDtos);
        }
    }
}
