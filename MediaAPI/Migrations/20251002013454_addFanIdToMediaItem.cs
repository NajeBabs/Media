using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MediaAPI.Migrations
{
    /// <inheritdoc />
    public partial class addFanIdToMediaItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FanId",
                table: "MediaItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MediaItems_FanId",
                table: "MediaItems",
                column: "FanId");

            migrationBuilder.AddForeignKey(
                name: "FK_MediaItems_Fans_FanId",
                table: "MediaItems",
                column: "FanId",
                principalTable: "Fans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaItems_Fans_FanId",
                table: "MediaItems");

            migrationBuilder.DropIndex(
                name: "IX_MediaItems_FanId",
                table: "MediaItems");

            migrationBuilder.DropColumn(
                name: "FanId",
                table: "MediaItems");
        }
    }
}
