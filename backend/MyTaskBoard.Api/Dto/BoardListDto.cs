namespace MyTaskBoard.Api.Dto
{
    public class BoardListDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<CardDto> Cards { get; set; }
    }
}
