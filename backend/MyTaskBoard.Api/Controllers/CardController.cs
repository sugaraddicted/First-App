using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CardController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICardRepository _cardRepository;
        private readonly IMapper _mapper;
        private readonly IActivityLogRepository _activityLogRepository;
        private readonly IBoardListRepository _boardListRepository;

        public CardController(ICardRepository cardRepository, IMapper mapper, IActivityLogRepository activityLogRepository, UserManager<User> userManager, IBoardListRepository boardListRepository)
        {
            _cardRepository = cardRepository;
            _mapper = mapper;
            _activityLogRepository = activityLogRepository;
            _userManager = userManager;
            _boardListRepository = boardListRepository;
        }

        [HttpGet("list/{listId}")]
        public async Task<IActionResult> GetCardsByListId(Guid listId)
        {
            var cards = await _cardRepository.GetByBoardListIdAsync(listId);
            var cardDtos = _mapper.Map<IEnumerable<CardDto>>(cards);
            return Ok(cardDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddCard(AddCardDto cardDto)
        {
            var user = await _userManager.GetUserAsync(User);
            var boardList = await _boardListRepository.GetByIdAsync(cardDto.BoardListId);
            var card = _mapper.Map<Card>(cardDto);
            await _cardRepository.AddAsync(card);

            var activityLogDto = new ActivityLogDto()
            {
                Action = $"You added",
                CardName = card.Name,
                UserId = user.Id,
                Timestamp = DateTime.UtcNow,
                After = boardList.Name,
                CardId = card.Id
            };

            var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
            await _activityLogRepository.AddAsync(activityLog);

            var cardDtoWithId = _mapper.Map<CardDto>(card);
            return CreatedAtAction(nameof(GetCardsByListId), new { listId = card.BoardListId }, cardDtoWithId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(Guid id, UpdateCardDto cardDto)
        {
            if (id != cardDto.Id)
                return BadRequest();

            var existingCard = await _cardRepository.GetByIdAsync(id);
            if (existingCard == null)
                return NotFound();

            await LogActivity(existingCard, cardDto);

            _mapper.Map(cardDto, existingCard);
            await _cardRepository.UpdateAsync(id, existingCard);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(Guid id)
        {
            var existingCard = await _cardRepository.GetByIdAsync(id);
            if (existingCard == null)
                return NotFound();

            var user = await _userManager.GetUserAsync(User);

            var activityLogDto = new ActivityLogDto()
            {
                Action = "You deleted",
                CardName = existingCard.Name,
                CardId = existingCard.Id,
                UserId = user.Id,
                Timestamp = DateTime.UtcNow
            };

            var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
            await _activityLogRepository.AddAsync(activityLog);

            await _cardRepository.DeleteAsync(id);

            return NoContent();
        }

        private async Task LogActivity(Card existingCard, UpdateCardDto newCard)
        {
            var user = await _userManager.GetUserAsync(User); 
            var activityLogs = new List<ActivityLogDto>();

            if (newCard.Name != existingCard.Name)
            {
                activityLogs.Add(
                    new ActivityLogDto()
                    {
                        Action = "You renamed",
                        Before = existingCard.Name,
                        After = newCard.Name,
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
                        Action ="You changed Due Date",
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
                activityLogDto.UserId = user.Id;
                activityLogDto.Timestamp = DateTime.UtcNow;

                var activityLog = _mapper.Map<ActivityLog>(activityLogDto);
                await _activityLogRepository.AddAsync(activityLog);
            }
        }
    }
}
