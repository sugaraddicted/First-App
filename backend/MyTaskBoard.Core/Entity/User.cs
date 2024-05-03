using Microsoft.AspNetCore.Identity;
using MyTaskBoard.Core.Entity.Interfaces;

namespace MyTaskBoard.Core.Entity
{
    public class User : IdentityUser<Guid>, IEntityBase
    {
        public List<BoardList> Lists { get; set; }
    }
}
