using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBoardRepository _boardRepository;

        public BoardController(IMapper mapper, IBoardRepository boardRepository)
        {
            _mapper = mapper;
            _boardRepository = boardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBoards()
        {
            var boards = await _boardRepository.GetAllAsync();
            var boardDtos = _mapper.Map<IEnumerable<BoardDto>>(boards);
            return Ok(boardDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBoard(Guid id)
        {
            var board = await _boardRepository.GetByIdAsync(id);
            if (board == null)
                return NotFound();

            var boardDto = _mapper.Map<BoardDto>(board);
            return Ok(boardDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddBoardList(string name)
        {
            var board = new Board
            {
                Name = name
            };
            await _boardRepository.AddAsync(board);

            var boardListDto = _mapper.Map<BoardDto>(board);
            return CreatedAtAction(nameof(GetBoard), new { id = boardListDto.Id }, boardListDto);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateBoard(Guid id, BoardDto boardDto)
        {
            if (id != boardDto.Id)
                return BadRequest();

            var existingBoard = await _boardRepository.GetByIdAsync(id);
            if (existingBoard == null)
                return NotFound();

            _mapper.Map(boardDto, existingBoard);
            await _boardRepository.UpdateAsync(id, existingBoard);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoard(Guid id)
        {
            var existingBoard = await _boardRepository.GetByIdAsync(id);
            if (existingBoard == null)
                return NotFound();

            await _boardRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
