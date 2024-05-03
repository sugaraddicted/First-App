using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTaskBoard.Core.Entity;

namespace MyTaskBoard.Infrastructure.Configurations
{
    public class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(c => c.BoardList)
                .WithMany(l => l.Cards);

            builder.HasMany(c => c.ActivityLogs)
                .WithOne(al => al.Card)
                .HasForeignKey(al=>  al.CardId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
