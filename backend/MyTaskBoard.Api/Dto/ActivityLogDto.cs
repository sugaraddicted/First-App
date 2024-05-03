﻿namespace MyTaskBoard.Api.Dto
{
    public class ActivityLogDto
    {
        public Guid Id { get; set; }
        public string Action { get; set; }
        public string CardName { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid UserId { get; set; }
        public Guid CardId { get; set; }
    }
}
