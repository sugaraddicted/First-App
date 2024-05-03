using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Core.Enums;
using MyTaskBoard.Infrastructure.Configurations;

namespace MyTaskBoard.Infrastructure.Persistence
{
    public class DataContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Priority>();

            modelBuilder.Entity<User>()
                .HasBaseType<IdentityUser<Guid>>();

            modelBuilder.Entity<IdentityUserLogin<Guid>>().HasKey(x => x.UserId);
            modelBuilder.Entity<IdentityUserRole<Guid>>().HasKey(x => x.UserId);
            modelBuilder.Entity<IdentityUserToken<Guid>>().HasKey(x => x.UserId);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new BoardListConfiguration());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<BoardList> BoardLists { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
    }
}
