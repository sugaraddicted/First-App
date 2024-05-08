using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTaskBoard.Core.Entity;

namespace MyTaskBoard.Infrastructure.Configurations
{
    public class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog>
    {
        public void Configure(EntityTypeBuilder<ActivityLog> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.Before)
                .HasMaxLength(255)
                .IsRequired(false);

            builder.Property(e => e.After)
                .HasMaxLength(255)
                .IsRequired(false);

            builder.Property(e => e.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.HasOne(al => al.Card)
                .WithMany(c => c.ActivityLogs)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
