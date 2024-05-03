namespace MyTaskBoard.Core.Entity
{
    public class BoardList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public List<Card> Cards { get; set; }
    }
}
