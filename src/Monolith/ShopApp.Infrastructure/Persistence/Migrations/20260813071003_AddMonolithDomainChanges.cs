using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMonolithDomainChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SiparisDurumlar",
                schema: "sales",
                table: "SiparisDurumlar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SepetDurumlar",
                schema: "sales",
                table: "SepetDurumlar");

            migrationBuilder.DropColumn(
                name: "DogumTarihi",
                schema: "identity",
                table: "Musteriler");

            migrationBuilder.DropColumn(
                name: "Email",
                schema: "identity",
                table: "Musteriler");

            migrationBuilder.DropColumn(
                name: "TamAdres",
                schema: "identity",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Ad",
                schema: "sales",
                table: "SiparisDurumlar");

            migrationBuilder.DropColumn(
                name: "Ad",
                schema: "sales",
                table: "SepetDurumlar");

            migrationBuilder.EnsureSchema(
                name: "kimlik");

            migrationBuilder.RenameTable(
                name: "Musteriler",
                schema: "identity",
                newName: "Musteriler",
                newSchema: "kimlik");

            migrationBuilder.RenameTable(
                name: "Addresses",
                schema: "identity",
                newName: "Addresses",
                newSchema: "kimlik");

            migrationBuilder.RenameTable(
                name: "SiparisDurumlar",
                schema: "sales",
                newName: "SiparisDurum",
                newSchema: "sales");

            migrationBuilder.RenameTable(
                name: "SepetDurumlar",
                schema: "sales",
                newName: "SepetDurumlari",
                newSchema: "sales");

            migrationBuilder.AlterColumn<string>(
                name: "Durum",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldDefaultValue: "True");

            migrationBuilder.AlterColumn<string>(
                name: "StokTakipNumarasi",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Siparisler",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "Siparisler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SepetUrunleri",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "SepetUrunleri",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Sepetler",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MusteriId",
                schema: "sales",
                table: "Sepetler",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "Sepetler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "kimlik",
                table: "Musteriler",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            // varchar→boolean requires explicit USING clause in PostgreSQL.
            migrationBuilder.Sql(
                @"ALTER TABLE kimlik.""Musteriler""
                  ALTER COLUMN ""Cinsiyet"" DROP NOT NULL,
                  ALTER COLUMN ""Cinsiyet"" TYPE boolean
                      USING CASE WHEN ""Cinsiyet"" IN ('true','True','1') THEN true
                                 WHEN ""Cinsiyet"" IN ('false','False','0') THEN false
                                 ELSE NULL END;");

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "kimlik",
                table: "Musteriler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            // char(5)→integer requires explicit USING clause in PostgreSQL.
            migrationBuilder.Sql(
                @"ALTER TABLE kimlik.""Addresses""
                  ALTER COLUMN ""PostaKodu"" TYPE integer
                      USING TRIM(""PostaKodu"")::integer;");

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "kimlik",
                table: "Addresses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AddressBilgisi",
                schema: "kimlik",
                table: "Addresses",
                type: "character varying(5000)",
                maxLength: 5000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AddColumn<Guid>(
                name: "GuncelleyenKullaniciId",
                schema: "kimlik",
                table: "Addresses",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DurumIsmi",
                schema: "sales",
                table: "SiparisDurum",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DurumIsmi",
                schema: "sales",
                table: "SepetDurumlari",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SiparisDurum",
                schema: "sales",
                table: "SiparisDurum",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SepetDurumlari",
                schema: "sales",
                table: "SepetDurumlari",
                column: "Id");

            migrationBuilder.InsertData(
                schema: "sales",
                table: "SepetDurumlari",
                columns: new[] { "Id", "DurumIsmi" },
                values: new object[,]
                {
                    { 1, "Aktif" },
                    { 2, "AktifDegil" },
                    { 3, "Tamamlanmis" },
                    { 4, "IptalEdilmis" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Siparisler_DurumId",
                schema: "sales",
                table: "Siparisler",
                column: "DurumId");

            migrationBuilder.CreateIndex(
                name: "IX_Sepetler_DurumId",
                schema: "sales",
                table: "Sepetler",
                column: "DurumId");

            migrationBuilder.CreateIndex(
                name: "IX_Musteriler_IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                column: "IdentityId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Musteriler_Users_IdentityId",
                schema: "kimlik",
                table: "Musteriler",
                column: "IdentityId",
                principalSchema: "identity",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sepetler_SepetDurumlari_DurumId",
                schema: "sales",
                table: "Sepetler",
                column: "DurumId",
                principalSchema: "sales",
                principalTable: "SepetDurumlari",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Siparisler_SiparisDurum_DurumId",
                schema: "sales",
                table: "Siparisler",
                column: "DurumId",
                principalSchema: "sales",
                principalTable: "SiparisDurum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Musteriler_Users_IdentityId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropForeignKey(
                name: "FK_Sepetler_SepetDurumlari_DurumId",
                schema: "sales",
                table: "Sepetler");

            migrationBuilder.DropForeignKey(
                name: "FK_Siparisler_SiparisDurum_DurumId",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.DropIndex(
                name: "IX_Siparisler_DurumId",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.DropIndex(
                name: "IX_Sepetler_DurumId",
                schema: "sales",
                table: "Sepetler");

            migrationBuilder.DropIndex(
                name: "IX_Musteriler_IdentityId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SiparisDurum",
                schema: "sales",
                table: "SiparisDurum");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SepetDurumlari",
                schema: "sales",
                table: "SepetDurumlari");

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlari",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlari",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlari",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "sales",
                table: "SepetDurumlari",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri");

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "SepetUrunleri");

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "sales",
                table: "Sepetler");

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropColumn(
                name: "IdentityId",
                schema: "kimlik",
                table: "Musteriler");

            migrationBuilder.DropColumn(
                name: "GuncelleyenKullaniciId",
                schema: "kimlik",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "DurumIsmi",
                schema: "sales",
                table: "SiparisDurum");

            migrationBuilder.DropColumn(
                name: "DurumIsmi",
                schema: "sales",
                table: "SepetDurumlari");

            migrationBuilder.RenameTable(
                name: "Musteriler",
                schema: "kimlik",
                newName: "Musteriler",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "Addresses",
                schema: "kimlik",
                newName: "Addresses",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "SiparisDurum",
                schema: "sales",
                newName: "SiparisDurumlar");

            migrationBuilder.RenameTable(
                name: "SepetDurumlari",
                schema: "sales",
                newName: "SepetDurumlar");

            migrationBuilder.AlterColumn<string>(
                name: "Durum",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "True",
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "StokTakipNumarasi",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Siparisler",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SepetUrunleri",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Sepetler",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "MusteriId",
                schema: "sales",
                table: "Sepetler",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Musteriler",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "Cinsiyet",
                schema: "identity",
                table: "Musteriler",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DogumTarihi",
                schema: "identity",
                table: "Musteriler",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "identity",
                table: "Musteriler",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "PostaKodu",
                schema: "identity",
                table: "Addresses",
                type: "character(5)",
                fixedLength: true,
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Addresses",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "AddressBilgisi",
                schema: "identity",
                table: "Addresses",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(5000)",
                oldMaxLength: 5000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TamAdres",
                schema: "identity",
                table: "Addresses",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ad",
                table: "SiparisDurumlar",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ad",
                table: "SepetDurumlar",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SiparisDurumlar",
                table: "SiparisDurumlar",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SepetDurumlar",
                table: "SepetDurumlar",
                column: "Id");
        }
    }
}
