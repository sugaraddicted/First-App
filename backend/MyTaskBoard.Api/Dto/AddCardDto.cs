﻿using MyTaskBoard.Core.Enums;

namespace MyTaskBoard.Api.Dto
{
    public class AddCardDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public string BoardListId { get; set; }
    }
}
