using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BoardListController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IBoardListRepository _boardListRepository;

        public BoardListController(IMapper mapper, IBoardListRepository boardListRepository)
        {
            _mapper = mapper;
            _boardListRepository = boardListRepository;
        }

        [HttpGet("board/{boardId}")]
        public async Task<IActionResult> GetByBoardId(Guid boardId)
        {
            var boardLists = await _boardListRepository.GetByBoardIdAsync(boardId);
            var boardListDtos = _mapper.Map<IEnumerable<BoardListDto>>(boardLists);
            return Ok(boardListDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBoardList(Guid id)
        {
            var boardList = await _boardListRepository.GetByIdAsync(id);
            if (boardList == null)
                return NotFound();

            var boardListDto = _mapper.Map<BoardListDto>(boardList);
            return Ok(boardListDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddBoardList(AddBoardListDto addBoardListDto)
        {
            var boardList = _mapper.Map<BoardList>(addBoardListDto);
            await _boardListRepository.AddAsync(boardList);

            var boardListDto = _mapper.Map<BoardListDto>(boardList);
            return CreatedAtAction(nameof(GetBoardList), new { id = boardListDto.Id }, boardListDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBoardList(Guid id, BoardListDto boardListDto)
        {
            if (id != boardListDto.Id)
                return BadRequest();

            var existingBoardList = await _boardListRepository.GetByIdAsync(id);
            if (existingBoardList == null)
                return NotFound();

            _mapper.Map(boardListDto, existingBoardList);
            await _boardListRepository.UpdateAsync(id, existingBoardList);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardList(Guid id)
        {
            var existingBoardList = await _boardListRepository.GetByIdAsync(id);
            if (existingBoardList == null)
                return NotFound();

            await _boardListRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
