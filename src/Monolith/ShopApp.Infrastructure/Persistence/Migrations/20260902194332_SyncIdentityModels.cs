using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SyncIdentityModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IndirimOrani",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.AlterColumn<decimal>(
                name: "UrunBirimFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "ToplamFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "IndirimOrani",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric(18,4)",
                precision: 18,
                scale: 4,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "ToplamFiyat",
                schema: "sales",
                table: "Siparisler",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<string>(
                name: "SiparisNumarasi",
                schema: "sales",
                table: "Siparisler",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.Sql("ALTER TABLE sales.\"Siparisler\" ALTER COLUMN \"MusteriId\" TYPE uuid USING \"MusteriId\"::uuid;");
            
            migrationBuilder.AlterColumn<decimal>(
                name: "KargoFiyat",
                schema: "sales",
                table: "Siparisler",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<decimal>(
                name: "AraToplam",
                schema: "sales",
                table: "Siparisler",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddColumn<decimal>(
                name: "IndirimTutari",
                schema: "sales",
                table: "Siparisler",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "FiyatGecmis",
                schema: "sales",
                table: "SepetUrunleri",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

           migrationBuilder.Sql("ALTER TABLE sales.\"Sepetler\" ALTER COLUMN \"MusteriId\" TYPE uuid USING \"MusteriId\"::uuid;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IndirimTutari",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.AlterColumn<decimal>(
                name: "UrunBirimFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "ToplamFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "IndirimOrani",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,4)",
                oldPrecision: 18,
                oldScale: 4);

            migrationBuilder.AlterColumn<decimal>(
                name: "ToplamFiyat",
                schema: "sales",
                table: "Siparisler",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<string>(
                name: "SiparisNumarasi",
                schema: "sales",
                table: "Siparisler",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.Sql("ALTER TABLE sales.\"Sepetler\" ALTER COLUMN \"MusteriId\" TYPE uuid USING \"MusteriId\"::uuid;");

            migrationBuilder.AlterColumn<decimal>(
                name: "KargoFiyat",
                schema: "sales",
                table: "Siparisler",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "AraToplam",
                schema: "sales",
                table: "Siparisler",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AddColumn<decimal>(
                name: "IndirimOrani",
                schema: "sales",
                table: "Siparisler",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "FiyatGecmis",
                schema: "sales",
                table: "SepetUrunleri",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.Sql("ALTER TABLE sales.\"Sepetler\" ALTER COLUMN \"MusteriId\" TYPE uuid USING \"MusteriId\"::uuid;");
        }
    }
}
