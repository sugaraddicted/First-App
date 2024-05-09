using MyTaskBoard.Core.Enums;

namespace MyTaskBoard.Api.Dto
{
    public class UpdateCardDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public Guid BoardListId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
