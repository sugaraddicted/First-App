using MyTaskBoard.Core.Entity.Interfaces;
using MyTaskBoard.Core.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyTaskBoard.Core.Entity
{
    public class Card : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public Guid BoardListId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedAt { get; set; }
        public BoardList BoardList { get; set; }
    }
}
