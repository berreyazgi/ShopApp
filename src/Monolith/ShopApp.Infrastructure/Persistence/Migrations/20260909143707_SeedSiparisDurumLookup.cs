using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedSiparisDurumLookup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Satis.SiparisDurum (the current table/schema name for the order
            // status lookup) lost its seed rows somewhere between the old
            // "sales.SiparisDurumlar" table (seeded by the 20260805093659
            // migration) and the later schema rebuild — this restores the
            // same values so SiparisEntity.Olustur's default DurumId (and
            // any UpdateSiparisCommand/UpdateAdminOrderStatusCommand target)
            // satisfies the FK_Siparisler_SiparisDurum_DurumId constraint.
            migrationBuilder.InsertData(
                schema: "Satis",
                table: "SiparisDurum",
                columns: new[] { "Id", "DurumIsmi" },
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "Satis",
                table: "SiparisDurum",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5, 6, 7 });
        }
    }
}
