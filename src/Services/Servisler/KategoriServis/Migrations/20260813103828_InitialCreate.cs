using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KategoriServis.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "katalog");

            migrationBuilder.CreateTable(
                name: "Kategoriler",
                schema: "katalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Ad = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Slug = table.Column<string>(type: "character varying(220)", maxLength: 220, nullable: false),
                    Aciklama = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    UstKategoriId = table.Column<Guid>(type: "uuid", nullable: true),
                    GorselUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoriler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kategoriler_Kategoriler_UstKategoriId",
                        column: x => x.UstKategoriId,
                        principalSchema: "katalog",
                        principalTable: "Kategoriler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Urunler",
                schema: "katalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KategoriId = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunIsmi = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    UrunAciklamasi = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Fiyat = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    MarkaIsmi = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    FiyatGecmis = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    GorselUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Urunler", x => x.Id);
                    table.CheckConstraint("CK_Urunler_Fiyat", "\"Fiyat\" >= 0");
                    table.ForeignKey(
                        name: "FK_Urunler_Kategoriler_KategoriId",
                        column: x => x.KategoriId,
                        principalSchema: "katalog",
                        principalTable: "Kategoriler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UrunGorselleri",
                schema: "katalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunId = table.Column<Guid>(type: "uuid", nullable: false),
                    GorselUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    GorselSiralamasi = table.Column<int>(type: "integer", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunGorselleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunGorselleri_Urunler_UrunId",
                        column: x => x.UrunId,
                        principalSchema: "katalog",
                        principalTable: "Urunler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrunTipleri",
                schema: "katalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunId = table.Column<Guid>(type: "uuid", nullable: false),
                    Ad = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    StokAdeti = table.Column<int>(type: "integer", nullable: false),
                    StokKodu = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FiyatFarki = table.Column<decimal>(type: "numeric(8,2)", precision: 18, scale: 2, nullable: false),
                    AktifMi = table.Column<bool>(type: "boolean", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunTipleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunTipleri_Urunler_UrunId",
                        column: x => x.UrunId,
                        principalSchema: "katalog",
                        principalTable: "Urunler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrunOzellikleri",
                schema: "katalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UrunTipiId = table.Column<Guid>(type: "uuid", nullable: false),
                    OzellikAdi = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Degeri = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrunOzellikleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrunOzellikleri_UrunTipleri_UrunTipiId",
                        column: x => x.UrunTipiId,
                        principalSchema: "katalog",
                        principalTable: "UrunTipleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kategoriler_UstKategoriId",
                schema: "katalog",
                table: "Kategoriler",
                column: "UstKategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_UrunGorselleri_UrunId_GorselSiralamasi",
                schema: "katalog",
                table: "UrunGorselleri",
                columns: new[] { "UrunId", "GorselSiralamasi" });

            migrationBuilder.CreateIndex(
                name: "IX_Urunler_KategoriId",
                schema: "katalog",
                table: "Urunler",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_UrunOzellikleri_UrunTipiId_OzellikAdi",
                schema: "katalog",
                table: "UrunOzellikleri",
                columns: new[] { "UrunTipiId", "OzellikAdi" });

            migrationBuilder.CreateIndex(
                name: "IX_UrunTipleri_StokKodu",
                schema: "katalog",
                table: "UrunTipleri",
                column: "StokKodu",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UrunTipleri_UrunId",
                schema: "katalog",
                table: "UrunTipleri",
                column: "UrunId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UrunGorselleri",
                schema: "katalog");

            migrationBuilder.DropTable(
                name: "UrunOzellikleri",
                schema: "katalog");

            migrationBuilder.DropTable(
                name: "UrunTipleri",
                schema: "katalog");

            migrationBuilder.DropTable(
                name: "Urunler",
                schema: "katalog");

            migrationBuilder.DropTable(
                name: "Kategoriler",
                schema: "katalog");
        }
    }
}
