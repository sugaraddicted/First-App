using MyTaskBoard.Core.Entity.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyTaskBoard.Core.Entity
{
    public class BoardList : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedAt { get; set; }
        public Guid BoardId { get; set; }
        public Board Board { get; set; }
        public List<Card> Cards { get; set; }

    }
}
