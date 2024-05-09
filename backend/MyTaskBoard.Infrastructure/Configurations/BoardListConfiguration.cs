using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTaskBoard.Core.Entity;

namespace MyTaskBoard.Infrastructure.Configurations
{
    public class BoardListConfiguration : IEntityTypeConfiguration<BoardList>
    {
        public void Configure(EntityTypeBuilder<BoardList> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(b => b.Id)
                .ValueGeneratedOnAdd();

            builder.HasMany(l => l.Cards)
                .WithOne(c => c.BoardList)
                .HasForeignKey(c => c.BoardListId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
