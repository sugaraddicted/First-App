
using MyTaskBoard.Core.Entity.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyTaskBoard.Core.Entity
{
    public class ActivityLog : IEntityBase
    {
        public Guid Id { get; set; }
        public string Action { get; set; }
        public string CardName { get; set; }
        public string Before { get; set; }
        public string After { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Timestamp { get; set; }
        public Guid CardId { get; set; }
        public Card Card { get; set; } 
    }

}
