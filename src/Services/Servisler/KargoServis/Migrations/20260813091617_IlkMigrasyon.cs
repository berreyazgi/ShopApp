using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KargoServis.Migrations
{
    /// <inheritdoc />
    public partial class IlkMigrasyon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "kargo");

            migrationBuilder.CreateTable(
                name: "Sevkiyat",
                schema: "kargo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SevkiyatTanım = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TakipUrlSablonu = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sevkiyat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KargoGonderileri",
                schema: "kargo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SiparisId = table.Column<Guid>(type: "uuid", nullable: false),
                    KargoSirketIsmi = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    TakipNumarasi = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    SevkiyatId = table.Column<Guid>(type: "uuid", nullable: true),
                    Durum = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    TahminiTeslimTarihi = table.Column<DateOnly>(type: "date", nullable: true),
                    TeslimatAdresiAnlikGoruntusu = table.Column<string>(type: "jsonb", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KargoGonderileri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KargoGonderileri_Sevkiyat_SevkiyatId",
                        column: x => x.SevkiyatId,
                        principalSchema: "kargo",
                        principalTable: "Sevkiyat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "KargoDurumGecmisleri",
                schema: "kargo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KargoGonderisiId = table.Column<Guid>(type: "uuid", nullable: false),
                    Durum = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KargoDurumGecmisleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KargoDurumGecmisleri_KargoGonderileri_KargoGonderisiId",
                        column: x => x.KargoGonderisiId,
                        principalSchema: "kargo",
                        principalTable: "KargoGonderileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KargoDurumGecmisleri_KargoGonderisiId_OlusturmaTarihi",
                schema: "kargo",
                table: "KargoDurumGecmisleri",
                columns: new[] { "KargoGonderisiId", "OlusturmaTarihi" });

            migrationBuilder.CreateIndex(
                name: "IX_KargoGonderileri_SevkiyatId",
                schema: "kargo",
                table: "KargoGonderileri",
                column: "SevkiyatId");

            migrationBuilder.CreateIndex(
                name: "IX_KargoGonderileri_SiparisId",
                schema: "kargo",
                table: "KargoGonderileri",
                column: "SiparisId");

            migrationBuilder.CreateIndex(
                name: "IX_KargoGonderileri_TakipNumarasi",
                schema: "kargo",
                table: "KargoGonderileri",
                column: "TakipNumarasi",
                unique: true,
                filter: "\"TakipNumarasi\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Sevkiyat_SevkiyatTanım",
                schema: "kargo",
                table: "Sevkiyat",
                column: "SevkiyatTanım",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KargoDurumGecmisleri",
                schema: "kargo");

            migrationBuilder.DropTable(
                name: "KargoGonderileri",
                schema: "kargo");

            migrationBuilder.DropTable(
                name: "Sevkiyat",
                schema: "kargo");
        }
    }
}
