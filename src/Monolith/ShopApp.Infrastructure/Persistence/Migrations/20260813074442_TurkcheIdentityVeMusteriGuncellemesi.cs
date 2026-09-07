using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TurkcheIdentityVeMusteriGuncellemesi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Musteriler_MusteriId",
                schema: "kimlik",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Musteriler_Users_IdentityId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                schema: "kimlik",
                table: "Addresses");

            migrationBuilder.RenameTable(
                name: "Addresses",
                schema: "kimlik",
                newName: "Adresler",
                newSchema: "kimlik");

            migrationBuilder.RenameColumn(
                name: "IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                newName: "KullaniciId");

            migrationBuilder.RenameIndex(
                name: "IX_Musteriler_IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                newName: "IX_Musteriler_KullaniciId");

            migrationBuilder.RenameColumn(
                name: "AddressBilgisi",
                schema: "kimlik",
                table: "Adresler",
                newName: "AdresBilgisi");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_MusteriId",
                schema: "kimlik",
                table: "Adresler",
                newName: "IX_Adresler_MusteriId");

            migrationBuilder.AddColumn<string>(
                name: "YenilemeToken",
                schema: "identity",
                table: "Users",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "YenilemeTokenBitis",
                schema: "identity",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PostaKodu",
                schema: "kimlik",
                table: "Adresler",
                type: "character varying(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Adresler",
                schema: "kimlik",
                table: "Adresler",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Adresler_Musteriler_MusteriId",
                schema: "kimlik",
                table: "Adresler",
                column: "MusteriId",
                principalSchema: "kimlik",
                principalTable: "Musteriler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Musteriler_Users_KullaniciId",
                schema: "kimlik",
                table: "Musteriler",
                column: "KullaniciId",
                principalSchema: "identity",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adresler_Musteriler_MusteriId",
                schema: "kimlik",
                table: "Adresler");

            migrationBuilder.DropForeignKey(
                name: "FK_Musteriler_Users_KullaniciId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Adresler",
                schema: "kimlik",
                table: "Adresler");

            migrationBuilder.DropColumn(
                name: "YenilemeToken",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "YenilemeTokenBitis",
                schema: "identity",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Adresler",
                schema: "kimlik",
                newName: "Addresses",
                newSchema: "kimlik");

            migrationBuilder.RenameColumn(
                name: "KullaniciId",
                schema: "kimlik",
                table: "Musteriler",
                newName: "IdentityId");

            migrationBuilder.RenameIndex(
                name: "IX_Musteriler_KullaniciId",
                schema: "kimlik",
                table: "Musteriler",
                newName: "IX_Musteriler_IdentityId");

            migrationBuilder.RenameColumn(
                name: "AdresBilgisi",
                schema: "kimlik",
                table: "Addresses",
                newName: "AddressBilgisi");

            migrationBuilder.RenameIndex(
                name: "IX_Adresler_MusteriId",
                schema: "kimlik",
                table: "Addresses",
                newName: "IX_Addresses_MusteriId");

            migrationBuilder.AlterColumn<int>(
                name: "PostaKodu",
                schema: "kimlik",
                table: "Addresses",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(10)",
                oldMaxLength: 10);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                schema: "kimlik",
                table: "Addresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Musteriler_MusteriId",
                schema: "kimlik",
                table: "Addresses",
                column: "MusteriId",
                principalSchema: "kimlik",
                principalTable: "Musteriler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Musteriler_Users_IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                column: "IdentityId",
                principalSchema: "identity",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
