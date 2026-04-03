using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalendarApp.API.Migrations
{
    /// <inheritdoc />
    public partial class AddColourToEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Colour",
                table: "CalendarEvents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colour",
                table: "CalendarEvents");
        }
    }
}
