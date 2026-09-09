using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMahalleAndConvertPostaKoduToInteger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "ALTER TABLE kimlik.\"Adresler\" ALTER COLUMN \"PostaKodu\" TYPE integer USING \"PostaKodu\"::integer;");

            migrationBuilder.AddColumn<int>(
                name: "Mahalle",
                schema: "kimlik",
                table: "Adresler",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mahalle",
                schema: "kimlik",
                table: "Adresler");

            migrationBuilder.Sql(
                "ALTER TABLE kimlik.\"Adresler\" ALTER COLUMN \"PostaKodu\" TYPE character varying(10) USING \"PostaKodu\"::text;");
        }
    }
}
