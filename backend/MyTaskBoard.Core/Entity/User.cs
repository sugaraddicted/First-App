using Microsoft.AspNetCore.Identity;

namespace MyTaskBoard.Core.Entity
{
    public class User : IdentityUser<Guid>
    {
        public List<BoardList> Lists { get; set; }
    }
}
