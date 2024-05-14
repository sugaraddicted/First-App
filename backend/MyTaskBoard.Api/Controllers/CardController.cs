using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Api.Helpers;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardRepository _cardRepository;
        private readonly IMapper _mapper;
        private readonly IBoardListRepository _boardListRepository;
        private readonly IActivityLogger _activityLogger;

        public CardController(ICardRepository cardRepository, IMapper mapper, IBoardListRepository boardListRepository, IActivityLogger activityLogger)
        {
            _cardRepository = cardRepository;
            _mapper = mapper;
            _boardListRepository = boardListRepository;
            _activityLogger = activityLogger;
        }

        [HttpGet("/{listId}")]
        public async Task<IActionResult> GetCardsByListId(Guid listId)
        {
            var cards = await _cardRepository.GetByBoardListIdAsync(listId);
            var cardDtos = _mapper.Map<IEnumerable<CardDto>>(cards);
            return Ok(cardDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetCards()
        {
            var cards = await _cardRepository.GetAllAsync();
            var cardDtos = _mapper.Map<IEnumerable<CardDto>>(cards);
            return Ok(cardDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddCard(AddCardDto cardDto)
        {
            var boardList = await _boardListRepository.GetByIdAsync(cardDto.BoardListId);
            var card = _mapper.Map<Card>(cardDto);
            await _cardRepository.AddAsync(card);

            await _activityLogger.LogOnCreate(card, boardList.Name);

            var cardDtoWithId = _mapper.Map<CardDto>(card);
            return CreatedAtAction(nameof(GetCardsByListId), new { listId = card.BoardListId }, cardDtoWithId);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateCard(Guid id, UpdateCardDto cardDto)
        {
            if (id != cardDto.Id)
                return BadRequest();

            var existingCard = await _cardRepository.GetByIdAsync(id);
            if (existingCard == null)
                return NotFound();

            await _activityLogger.LogOnUpdate(existingCard, cardDto);

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

            await _activityLogger.LogOnDelete(existingCard);

            await _cardRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
