using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 5);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 6);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SiparisDurumlar",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 7);

            migrationBuilder.RenameTable(
                name: "SiparisDurumlar",
                schema: "sales",
                newName: "SiparisDurumlar");

            migrationBuilder.RenameTable(
                name: "SepetDurumlar",
                schema: "sales",
                newName: "SepetDurumlar");

            migrationBuilder.RenameColumn(
                name: "Status",
                schema: "sales",
                table: "Siparisler",
                newName: "DurumId");

            migrationBuilder.RenameColumn(
                name: "Durum",
                schema: "sales",
                table: "Sepetler",
                newName: "DurumId");

            migrationBuilder.AddColumn<string>(
                name: "UrunAciklamasi",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Ad",
                schema: "sales",
                table: "SiparisDurumlar",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "sales",
                table: "SiparisDurumlar",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Ad",
                schema: "sales",
                table: "SepetDurumlar",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "sales",
                table: "SepetDurumlar",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UrunAciklamasi",
                schema: "sales",
                table: "SiparisUrunleri");

            migrationBuilder.RenameTable(
                name: "SiparisDurumlar",
                newName: "SiparisDurumlar",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "SepetDurumlar",
                newName: "SepetDurumlar",
                newSchema: "sales");

            migrationBuilder.RenameColumn(
                name: "DurumId",
                schema: "sales",
                table: "Siparisler",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "DurumId",
                schema: "sales",
                table: "Sepetler",
                newName: "Durum");

            migrationBuilder.AlterColumn<string>(
                name: "Ad",
                schema: "sales",
                table: "SiparisDurumlar",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "sales",
                table: "SiparisDurumlar",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<string>(
                name: "Ad",
                schema: "sales",
                table: "SepetDurumlar",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "sales",
                table: "SepetDurumlar",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.InsertData(
                schema: "sales",
                table: "SepetDurumlar",
                columns: new[] { "Id", "Ad" },
                values: new object[,]
                {
                    { 1, "Aktif" },
                    { 2, "AktifDegil" },
                    { 3, "Tamamlanmis" },
                    { 4, "IptalEdilmis" }
                });

            migrationBuilder.InsertData(
                schema: "sales",
                table: "SiparisDurumlar",
                columns: new[] { "Id", "Ad" },
                values: new object[,]
                {
                    { 1, "BekleyenOdeme" },
                    { 2, "Odenmis" },
                    { 3, "Hazirlaniyor" },
                    { 4, "Gönderildi" },
                    { 5, "TeslimEdildi" },
                    { 6, "IptalEdildi" },
                    { 7, "IadeEdildi" }
                });
        }
    }
}
