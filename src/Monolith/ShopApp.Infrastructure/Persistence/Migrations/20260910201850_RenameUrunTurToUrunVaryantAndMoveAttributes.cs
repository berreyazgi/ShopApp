using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameUrunTurToUrunVaryantAndMoveAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UrunOzellik_UrunTur_UrunTipiId",
                schema: "Urunler",
                table: "UrunOzellik");

            migrationBuilder.RenameTable(
                name: "UrunTur",
                schema: "Urunler",
                newName: "UrunVaryant",
                newSchema: "Urunler");

            migrationBuilder.Sql("""
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                        FROM "Urunler"."UrunVaryant"
                        WHERE char_length("Ad") > 50
                    ) THEN
                        RAISE EXCEPTION 'UrunTur.Ad contains values longer than 50 characters. Review and normalize them before applying the UrunVaryant migration.';
                    END IF;
                END $$;
                """);

            migrationBuilder.RenameColumn(
                name: "Ad",
                schema: "Urunler",
                table: "UrunVaryant",
                newName: "Beden");

            migrationBuilder.AlterColumn<string>(
                name: "Beden",
                schema: "Urunler",
                table: "UrunVaryant",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(300)",
                oldMaxLength: 300);

            migrationBuilder.RenameColumn(
                name: "StokAded",
                schema: "Urunler",
                table: "UrunVaryant",
                newName: "StokAdet");

            migrationBuilder.AddColumn<string>(
                name: "Renk",
                schema: "Urunler",
                table: "UrunVaryant",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.RenameIndex(
                name: "IX_UrunTur_StokKod",
                schema: "Urunler",
                table: "UrunVaryant",
                newName: "IX_UrunVaryant_StokKod");

            migrationBuilder.RenameIndex(
                name: "IX_UrunTur_UrunId",
                schema: "Urunler",
                table: "UrunVaryant",
                newName: "IX_UrunVaryant_UrunId");

            migrationBuilder.RenameColumn(
                name: "UrunTipiId",
                schema: "Urunler",
                table: "UrunOzellik",
                newName: "UrunVaryantId");

            migrationBuilder.RenameColumn(
                name: "OzellikDeger",
                schema: "Urunler",
                table: "UrunOzellik",
                newName: "Deger");

            migrationBuilder.RenameIndex(
                name: "IX_UrunOzellik_UrunTipiId_OzellikAd",
                schema: "Urunler",
                table: "UrunOzellik",
                newName: "IX_UrunOzellik_UrunVaryantId_OzellikAd");

            migrationBuilder.AddColumn<Guid>(
                name: "UrunId",
                schema: "Urunler",
                table: "UrunOzellik",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Siralama",
                schema: "Urunler",
                table: "UrunOzellik",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql("""
                UPDATE "Urunler"."UrunOzellik" AS ozellik
                SET "UrunId" = varyant."UrunId"
                FROM "Urunler"."UrunVaryant" AS varyant
                WHERE ozellik."UrunVaryantId" = varyant."Id";

                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                        FROM "Urunler"."UrunOzellik"
                        WHERE "UrunId" IS NULL
                    ) THEN
                        RAISE EXCEPTION 'A UrunOzellik row could not be associated with a product; migration aborted without deleting data.';
                    END IF;
                END $$;

                DELETE FROM "Urunler"."UrunOzellik" AS duplicate
                USING "Urunler"."UrunOzellik" AS retained
                WHERE duplicate."Id" > retained."Id"
                  AND duplicate."UrunId" = retained."UrunId"
                  AND duplicate."OzellikAd" = retained."OzellikAd"
                  AND duplicate."Deger" = retained."Deger";

                WITH ordered AS (
                    SELECT "Id",
                           ROW_NUMBER() OVER (
                               PARTITION BY "UrunId"
                               ORDER BY "OlusturmaTarihi", "Id") - 1 AS "Siralama"
                    FROM "Urunler"."UrunOzellik"
                )
                UPDATE "Urunler"."UrunOzellik" AS ozellik
                SET "Siralama" = ordered."Siralama"
                FROM ordered
                WHERE ozellik."Id" = ordered."Id";
                """);

            migrationBuilder.AlterColumn<Guid>(
                name: "UrunId",
                schema: "Urunler",
                table: "UrunOzellik",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.DropIndex(
                name: "IX_UrunOzellik_UrunVaryantId_OzellikAd",
                schema: "Urunler",
                table: "UrunOzellik");

            migrationBuilder.DropColumn(
                name: "UrunVaryantId",
                schema: "Urunler",
                table: "UrunOzellik");

            migrationBuilder.CreateIndex(
                name: "IX_UrunOzellik_UrunId_OzellikAd",
                schema: "Urunler",
                table: "UrunOzellik",
                columns: new[] { "UrunId", "OzellikAd" });

            migrationBuilder.AddForeignKey(
                name: "FK_UrunOzellik_Urun_UrunId",
                schema: "Urunler",
                table: "UrunOzellik",
                column: "UrunId",
                principalSchema: "Urunler",
                principalTable: "Urun",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameColumn(
                name: "UrunTurId",
                schema: "Satis",
                table: "SiparisUrunleri",
                newName: "UrunVaryantId");

            migrationBuilder.RenameColumn(
                name: "UrunTurId",
                schema: "Satis",
                table: "SepetUrunleri",
                newName: "UrunVaryantId");

            migrationBuilder.AddColumn<string>(
                name: "Beden",
                schema: "Satis",
                table: "SiparisUrunleri",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Renk",
                schema: "Satis",
                table: "SiparisUrunleri",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            throw new NotSupportedException(
                "This data-preserving migration is intentionally not reversible automatically. Restore a backup or write a reviewed data migration to re-expand product attributes per variant.");
        }
    }
}
