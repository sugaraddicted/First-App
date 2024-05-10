
namespace MyTaskBoard.Api.Dto
{
    public class BoardDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<BoardListDto> Lists { get; set; }
    }
}
