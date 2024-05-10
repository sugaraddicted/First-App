using MyTaskBoard.Core.Entity.Interfaces;

namespace MyTaskBoard.Core.Entity
{
    public class Board : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Card> Cards { get; set; }
        public List<BoardList> Lists { get; set; }
        public List<ActivityLog> ActivityLogs { get; set; }
    }
}
