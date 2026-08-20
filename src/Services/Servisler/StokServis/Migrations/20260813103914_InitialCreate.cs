using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StokServis.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "stok");

            migrationBuilder.CreateTable(
                name: "Depolar",
                schema: "stok",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DepoIsmi = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    DepoAdresi = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Sehir = table.Column<int>(type: "integer", nullable: false),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Depolar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StokKalemleri",
                schema: "stok",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunTipiId = table.Column<Guid>(type: "uuid", nullable: false),
                    DepoId = table.Column<Guid>(type: "uuid", nullable: false),
                    StokUrunMiktar = table.Column<int>(type: "integer", maxLength: 100, nullable: false),
                    RezerveMiktar = table.Column<int>(type: "integer", maxLength: 100, nullable: false),
                    DepoKonumu = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    YenidenSiparisSeviyesi = table.Column<int>(type: "integer", nullable: true),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StokKalemleri", x => x.Id);
                    table.CheckConstraint("CK_StokKalemleri_Miktar", "\"StokUrunMiktar\" >= 0");
                    table.CheckConstraint("CK_StokKalemleri_RezerveMiktar", "\"RezerveMiktar\" >= 0 AND \"RezerveMiktar\" <= \"StokUrunMiktar\"");
                    table.ForeignKey(
                        name: "FK_StokKalemleri_Depolar_DepoId",
                        column: x => x.DepoId,
                        principalSchema: "stok",
                        principalTable: "Depolar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StokHareketleri",
                schema: "stok",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StokKalemiId = table.Column<Guid>(type: "uuid", nullable: false),
                    HareketTipi = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Miktar = table.Column<int>(type: "integer", nullable: false),
                    Aciklama = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReferansId = table.Column<Guid>(type: "uuid", nullable: true),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StokHareketleri", x => x.Id);
                    table.CheckConstraint("CK_StokHareketleri_Miktar", "\"Miktar\" > 0");
                    table.ForeignKey(
                        name: "FK_StokHareketleri_StokKalemleri_StokKalemiId",
                        column: x => x.StokKalemiId,
                        principalSchema: "stok",
                        principalTable: "StokKalemleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Depolar_DepoIsmi",
                schema: "stok",
                table: "Depolar",
                column: "DepoIsmi",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StokHareketleri_ReferansId",
                schema: "stok",
                table: "StokHareketleri",
                column: "ReferansId");

            migrationBuilder.CreateIndex(
                name: "IX_StokHareketleri_StokKalemiId_OlusturmaTarihi",
                schema: "stok",
                table: "StokHareketleri",
                columns: new[] { "StokKalemiId", "OlusturmaTarihi" });

            migrationBuilder.CreateIndex(
                name: "IX_StokKalemleri_DepoId",
                schema: "stok",
                table: "StokKalemleri",
                column: "DepoId");

            migrationBuilder.CreateIndex(
                name: "IX_StokKalemleri_UrunTipiId",
                schema: "stok",
                table: "StokKalemleri",
                column: "UrunTipiId");

            migrationBuilder.CreateIndex(
                name: "IX_StokKalemleri_UrunTipiId_DepoId",
                schema: "stok",
                table: "StokKalemleri",
                columns: new[] { "UrunTipiId", "DepoId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StokHareketleri",
                schema: "stok");

            migrationBuilder.DropTable(
                name: "StokKalemleri",
                schema: "stok");

            migrationBuilder.DropTable(
                name: "Depolar",
                schema: "stok");
        }
    }
}
