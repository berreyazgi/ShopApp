using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StandardizeSepetUrunuQuantityField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UrunAdet",
                schema: "sales",
                table: "SepetUrunleri");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UrunAdet",
                schema: "sales",
                table: "SepetUrunleri",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
