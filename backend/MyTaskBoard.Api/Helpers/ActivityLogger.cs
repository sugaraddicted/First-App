using AutoMapper;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Helpers
{
    public class ActivityLogger : IActivityLogger
    {
        private readonly IBoardListRepository _boardListRepository;
        private readonly IActivityLogRepository _activityLogRepository;
        private readonly IMapper _mapper;
        public ActivityLogger(IBoardListRepository boardListRepository, IActivityLogRepository activityLogRepository, IMapper mapper)
        {
            _boardListRepository = boardListRepository;
            _activityLogRepository = activityLogRepository;
            _mapper = mapper;
        }

        public async Task LogOnCreate(Card card)
        {
            var activityLogDto = new ActivityLogDto()
            {
                Action = $"You added",
                CardName = card.Name,
                Timestamp = DateTime.UtcNow,
                After = card.BoardListId.ToString(),
                CardId = card.Id,
                BoardId = card.BoardId
            };

            var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
            await _activityLogRepository.AddAsync(activityLog);
        }
        public async Task LogOnDelete(Card card)
        {
            var activityLogDto = new ActivityLogDto()
            {
                Action = "You deleted",
                CardName = card.Name,
                CardId = card.Id,
                Timestamp = DateTime.UtcNow,
                BoardId = card.BoardId
            };

            var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
            await _activityLogRepository.AddAsync(activityLog);
        }
        public async Task LogOnUpdate(Card existingCard, UpdateCardDto newCard)
        {
            var activityLogs = new List<ActivityLogDto>();
            var boardList = await _boardListRepository.GetByIdAsync(existingCard.BoardListId);

            if (newCard.Name != existingCard.Name)
            {
                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You renamed",
                        Before = existingCard.Name,
                        After = newCard.Name
                    });
            }

            if (newCard.BoardListId != existingCard.BoardListId)
            {
                var newBoardList = await _boardListRepository.GetByIdAsync(newCard.BoardListId);
                var oldBoardList = await _boardListRepository.GetByIdAsync(existingCard.BoardListId);

                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You moved",
                        Before = oldBoardList.Name,
                        After = newBoardList.Name,
                    });
            }

            if (newCard.DueDate != existingCard.DueDate)
            {
                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You changed Due Date",
                        Before = existingCard.DueDate.ToShortDateString() + " " + existingCard.DueDate.ToShortTimeString(),
                        After = newCard.DueDate.ToShortDateString() + " " + newCard.DueDate.ToShortTimeString(),
                    });
            }

            if (newCard.Priority != existingCard.Priority)
            {
                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You changed priority",
                        Before = existingCard.Priority.ToString(),
                        After = newCard.Priority.ToString(),
                    });
            }

            if (newCard.Description != existingCard.Description)
            {
                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You changed Description",
                        Before = existingCard.Description,
                        After = newCard.Description,
                    });
            }

            foreach (var activityLogDto in activityLogs)
            {
                activityLogDto.CardId = existingCard.Id;
                activityLogDto.CardName = newCard.Name;
                activityLogDto.Timestamp = DateTime.UtcNow;
                activityLogDto.BoardId = existingCard.BoardId;

                var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
                await _activityLogRepository.AddAsync(activityLog);
            }
        }
    }
}
