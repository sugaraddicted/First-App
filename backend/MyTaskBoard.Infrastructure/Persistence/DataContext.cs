using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Core.Enums;
using MyTaskBoard.Infrastructure.Configurations;

namespace MyTaskBoard.Infrastructure.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Priority>();

            modelBuilder.ApplyConfiguration(new BoardListConfiguration());
            modelBuilder.ApplyConfiguration(new CardConfiguration());
            modelBuilder.ApplyConfiguration(new ActivityLogConfiguration());
        }

        public DbSet<BoardList> BoardLists { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
    }
}
