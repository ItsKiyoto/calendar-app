using CalendarApp.API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CalendarApp.API.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        // This represents the CalendarEvents table in the database
        public DbSet<CalendarEvent> CalendarEvents => Set<CalendarEvent>();
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Always call the base method first to ensure Identity configurations are applied
            base.OnModelCreating(builder);

            // Configure the relationship between AppUser and CalendarEvent
            builder.Entity<CalendarEvent>(entity =>
                {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Location).HasMaxLength(300);

                // Configure the relationship with AppUser
                entity.HasOne(e => e.User)
                .WithMany(u => u.CalendarEvents)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                }
            );
        }
    }
}