using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RebuildAllEntitySchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Urunler");

            migrationBuilder.EnsureSchema(
                name: "Satis");

            migrationBuilder.RenameTable(
                name: "SiparisUrunleri",
                schema: "sales",
                newName: "SiparisUrunleri",
                newSchema: "Satis");

            migrationBuilder.RenameTable(
                name: "Siparisler",
                schema: "sales",
                newName: "Siparisler",
                newSchema: "Satis");

            migrationBuilder.RenameTable(
                name: "SiparisDurum",
                schema: "sales",
                newName: "SiparisDurum",
                newSchema: "Satis");

            migrationBuilder.RenameTable(
                name: "SepetUrunleri",
                schema: "sales",
                newName: "SepetUrunleri",
                newSchema: "Satis");

            migrationBuilder.RenameTable(
                name: "Sepetler",
                schema: "sales",
                newName: "Sepetler",
                newSchema: "Satis");

            migrationBuilder.RenameTable(
                name: "SepetDurumlari",
                schema: "sales",
                newName: "SepetDurumlari",
                newSchema: "Satis");

            migrationBuilder.AddColumn<Guid>(
                name: "UrunId",
                schema: "Satis",
                table: "SiparisUrunleri",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Kategori",
                schema: "Urunler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KategoriAd = table.Column<string>(type: "text", nullable: false),
                    UstKategoriId = table.Column<Guid>(type: "uuid", nullable: true),
                    Detay = table.Column<string>(type: "text", nullable: true),
                    GorselUrl = table.Column<string>(type: "text", nullable: true),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategori", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kategori_Kategori_UstKategoriId",
                        column: x => x.UstKategoriId,
                        principalSchema: "Urunler",
                        principalTable: "Kategori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Urun",
                schema: "Urunler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KategoriId = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunAd = table.Column<string>(type: "text", nullable: false),
                    Detay = table.Column<string>(type: "text", nullable: true),
                    Fiyat = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    MarkaAd = table.Column<string>(type: "text", nullable: false),
                    GecmisFiyat = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    GorselUrl = table.Column<string>(type: "text", nullable: true),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urun", x => x.Id);
                    table.CheckConstraint("CK_Urunler_Fiyat", "\"Fiyat\" >= 0");
                    table.ForeignKey(
                        name: "FK_Urun_Kategori_KategoriId",
                        column: x => x.KategoriId,
                        principalSchema: "Urunler",
                        principalTable: "Kategori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UrunGorsel",
                schema: "Urunler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunId = table.Column<Guid>(type: "uuid", nullable: false),
                    GorselUrl = table.Column<string>(type: "text", nullable: false),
                    GorselSira = table.Column<int>(type: "integer", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunGorsel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunGorsel_Urun_UrunId",
                        column: x => x.UrunId,
                        principalSchema: "Urunler",
                        principalTable: "Urun",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrunTur",
                schema: "Urunler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunId = table.Column<Guid>(type: "uuid", nullable: false),
                    Ad = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    StokAded = table.Column<int>(type: "integer", nullable: false),
                    StokKod = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FiyatFarki = table.Column<decimal>(type: "numeric(8,2)", precision: 18, scale: 2, nullable: false),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunTur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunTur_Urun_UrunId",
                        column: x => x.UrunId,
                        principalSchema: "Urunler",
                        principalTable: "Urun",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrunOzellik",
                schema: "Urunler",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunTipiId = table.Column<Guid>(type: "uuid", nullable: false),
                    OzellikAd = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    OzellikDeger = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunOzellik", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunOzellik_UrunTur_UrunTipiId",
                        column: x => x.UrunTipiId,
                        principalSchema: "Urunler",
                        principalTable: "UrunTur",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kategori_UstKategoriId",
                schema: "Urunler",
                table: "Kategori",
                column: "UstKategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Urun_KategoriId",
                schema: "Urunler",
                table: "Urun",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_UrunGorsel_UrunId_GorselSira",
                schema: "Urunler",
                table: "UrunGorsel",
                columns: new[] { "UrunId", "GorselSira" });

            migrationBuilder.CreateIndex(
                name: "IX_UrunOzellik_UrunTipiId_OzellikAd",
                schema: "Urunler",
                table: "UrunOzellik",
                columns: new[] { "UrunTipiId", "OzellikAd" });

            migrationBuilder.CreateIndex(
                name: "IX_UrunTur_StokKod",
                schema: "Urunler",
                table: "UrunTur",
                column: "StokKod",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UrunTur_UrunId",
                schema: "Urunler",
                table: "UrunTur",
                column: "UrunId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UrunGorsel",
                schema: "Urunler");

            migrationBuilder.DropTable(
                name: "UrunOzellik",
                schema: "Urunler");

            migrationBuilder.DropTable(
                name: "UrunTur",
                schema: "Urunler");

            migrationBuilder.DropTable(
                name: "Urun",
                schema: "Urunler");

            migrationBuilder.DropTable(
                name: "Kategori",
                schema: "Urunler");

            migrationBuilder.DropColumn(
                name: "UrunId",
                schema: "Satis",
                table: "SiparisUrunleri");

            migrationBuilder.EnsureSchema(
                name: "sales");

            migrationBuilder.RenameTable(
                name: "SiparisUrunleri",
                schema: "Satis",
                newName: "SiparisUrunleri",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "Siparisler",
                schema: "Satis",
                newName: "Siparisler",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "SiparisDurum",
                schema: "Satis",
                newName: "SiparisDurum",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "SepetUrunleri",
                schema: "Satis",
                newName: "SepetUrunleri",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "Sepetler",
                schema: "Satis",
                newName: "Sepetler",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "SepetDurumlari",
                schema: "Satis",
                newName: "SepetDurumlari",
                newSchema: "sales");
        }
    }
}
