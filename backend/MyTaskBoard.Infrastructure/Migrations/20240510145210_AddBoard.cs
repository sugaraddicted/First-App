using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyTaskBoard.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBoard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BoardId",
                table: "Cards",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "BoardId",
                table: "BoardLists",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "BoardId",
                table: "ActivityLogs",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoardLists_BoardId",
                table: "BoardLists",
                column: "BoardId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_BoardId",
                table: "ActivityLogs",
                column: "BoardId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityLogs_Boards_BoardId",
                table: "ActivityLogs",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoardLists_Boards_BoardId",
                table: "BoardLists",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Boards_BoardListId",
                table: "Cards",
                column: "BoardListId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityLogs_Boards_BoardId",
                table: "ActivityLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_BoardLists_Boards_BoardId",
                table: "BoardLists");

            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Boards_BoardListId",
                table: "Cards");

            migrationBuilder.DropTable(
                name: "Boards");

            migrationBuilder.DropIndex(
                name: "IX_BoardLists_BoardId",
                table: "BoardLists");

            migrationBuilder.DropIndex(
                name: "IX_ActivityLogs_BoardId",
                table: "ActivityLogs");

            migrationBuilder.DropColumn(
                name: "BoardId",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "BoardId",
                table: "BoardLists");

            migrationBuilder.DropColumn(
                name: "BoardId",
                table: "ActivityLogs");
        }
    }
}
