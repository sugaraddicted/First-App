using MyTaskBoard.Core.Enums;

namespace MyTaskBoard.Core.Entity
{
    public class Card
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public Guid BoardListId { get; set; }
        public List<ActivityLog> ActivityLogs { get; set; }
        public BoardList BoardList { get; set; }
    }
}
