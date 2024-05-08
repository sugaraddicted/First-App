namespace MyTaskBoard.Api.Dto
{
    public class ActivityLogDto
    {
        public Guid Id { get; set; }
        public string Action { get; set; }
        public string CardName { get; set; }
        public string Before { get; set; }
        public string After { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid CardId { get; set; }
    }
}
