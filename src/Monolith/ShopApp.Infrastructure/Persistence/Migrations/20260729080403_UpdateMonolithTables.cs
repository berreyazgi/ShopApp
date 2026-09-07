using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMonolithTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Create lookup tables
            migrationBuilder.CreateTable(
                name: "SepetDurumlar",
                schema: "sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Ad = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SepetDurumlar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiparisDurumlar",
                schema: "sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Ad = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiparisDurumlar", x => x.Id);
                });

            // 2. Seed lookup data (using C# enum value names)
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

            // 3. Rename columns on SiparisUrunleri
            migrationBuilder.RenameColumn(
                name: "UrunCesidId",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "UrunTurId");

            migrationBuilder.RenameColumn(
                name: "Sku",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "StokTakipNumarasi");

            migrationBuilder.RenameColumn(
                name: "Miktar",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "UrunMiktar");

            migrationBuilder.RenameColumn(
                name: "BirimFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "UrunBirimFiyat");

            // 4. Rename column on Siparisler
            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                schema: "sales",
                table: "Siparisler",
                newName: "ToplamFiyat");

            // 5. Rename columns on SepetUrunleri
            migrationBuilder.RenameColumn(
                name: "UrunCesidId",
                schema: "sales",
                table: "SepetUrunleri",
                newName: "UrunTurId");

            migrationBuilder.RenameColumn(
                name: "BirimFiyatSnapshot",
                schema: "sales",
                table: "SepetUrunleri",
                newName: "FiyatGecmis");

            // 6. Alter Identity columns from string to Guid
            // Must drop FK constraints before altering referenced/referencing columns in PostgreSQL
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" DROP CONSTRAINT IF EXISTS ""FK_UserTokens_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" DROP CONSTRAINT IF EXISTS ""FK_UserRoles_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" DROP CONSTRAINT IF EXISTS ""FK_UserRoles_Roles_RoleId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" DROP CONSTRAINT IF EXISTS ""FK_UserLogins_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" DROP CONSTRAINT IF EXISTS ""FK_UserClaims_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" DROP CONSTRAINT IF EXISTS ""FK_RoleClaims_Roles_RoleId"";");

            // Alter parent tables first
            migrationBuilder.Sql(@"ALTER TABLE identity.""Users"" ALTER COLUMN ""Id"" TYPE uuid USING ""Id""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Roles"" ALTER COLUMN ""Id"" TYPE uuid USING ""Id""::uuid;");

            // Alter child/dependent tables
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ALTER COLUMN ""RoleId"" TYPE uuid USING ""RoleId""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" ALTER COLUMN ""UserId"" TYPE uuid USING ""UserId""::uuid;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" ALTER COLUMN ""RoleId"" TYPE uuid USING ""RoleId""::uuid;");

            // Re-add FK constraints
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" ADD CONSTRAINT ""FK_UserTokens_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ADD CONSTRAINT ""FK_UserRoles_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ADD CONSTRAINT ""FK_UserRoles_Roles_RoleId"" FOREIGN KEY (""RoleId"") REFERENCES identity.""Roles"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" ADD CONSTRAINT ""FK_UserLogins_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" ADD CONSTRAINT ""FK_UserClaims_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" ADD CONSTRAINT ""FK_RoleClaims_Roles_RoleId"" FOREIGN KEY (""RoleId"") REFERENCES identity.""Roles"" (""Id"") ON DELETE CASCADE;");

            // 7. Alter Address columns from string to int
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Ulke"" TYPE integer USING ""Ulke""::integer;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Sehir"" TYPE integer USING ""Sehir""::integer;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Ilce"" TYPE integer USING ""Ilce""::integer;");

            // 8. Add OlusturanKullaniciId audit columns
            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Siparisler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SepetUrunleri",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Sepetler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Musteriler",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Addresses",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SepetDurumlar",
                schema: "sales");

            migrationBuilder.DropTable(
                name: "SiparisDurumlar",
                schema: "sales");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SiparisUrunleri");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Siparisler");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "SepetUrunleri");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "sales",
                table: "Sepetler");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Musteriler");

            migrationBuilder.DropColumn(
                name: "OlusturanKullaniciId",
                schema: "identity",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "UrunTurId",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "UrunCesidId");

            migrationBuilder.RenameColumn(
                name: "StokTakipNumarasi",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "Sku");

            migrationBuilder.RenameColumn(
                name: "UrunMiktar",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "Miktar");

            migrationBuilder.RenameColumn(
                name: "UrunBirimFiyat",
                schema: "sales",
                table: "SiparisUrunleri",
                newName: "BirimFiyat");

            migrationBuilder.RenameColumn(
                name: "ToplamFiyat",
                schema: "sales",
                table: "Siparisler",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "UrunTurId",
                schema: "sales",
                table: "SepetUrunleri",
                newName: "UrunCesidId");

            migrationBuilder.RenameColumn(
                name: "FiyatGecmis",
                schema: "sales",
                table: "SepetUrunleri",
                newName: "BirimFiyatSnapshot");

            // Reverse Identity column type changes
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" DROP CONSTRAINT IF EXISTS ""FK_UserTokens_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" DROP CONSTRAINT IF EXISTS ""FK_UserRoles_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" DROP CONSTRAINT IF EXISTS ""FK_UserRoles_Roles_RoleId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" DROP CONSTRAINT IF EXISTS ""FK_UserLogins_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" DROP CONSTRAINT IF EXISTS ""FK_UserClaims_Users_UserId"";");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" DROP CONSTRAINT IF EXISTS ""FK_RoleClaims_Roles_RoleId"";");

            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" ALTER COLUMN ""UserId"" TYPE text USING ""UserId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ALTER COLUMN ""UserId"" TYPE text USING ""UserId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ALTER COLUMN ""RoleId"" TYPE text USING ""RoleId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" ALTER COLUMN ""UserId"" TYPE text USING ""UserId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" ALTER COLUMN ""UserId"" TYPE text USING ""UserId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" ALTER COLUMN ""RoleId"" TYPE text USING ""RoleId""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Users"" ALTER COLUMN ""Id"" TYPE text USING ""Id""::text;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Roles"" ALTER COLUMN ""Id"" TYPE text USING ""Id""::text;");

            migrationBuilder.Sql(@"ALTER TABLE identity.""UserTokens"" ADD CONSTRAINT ""FK_UserTokens_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ADD CONSTRAINT ""FK_UserRoles_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserRoles"" ADD CONSTRAINT ""FK_UserRoles_Roles_RoleId"" FOREIGN KEY (""RoleId"") REFERENCES identity.""Roles"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserLogins"" ADD CONSTRAINT ""FK_UserLogins_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""UserClaims"" ADD CONSTRAINT ""FK_UserClaims_Users_UserId"" FOREIGN KEY (""UserId"") REFERENCES identity.""Users"" (""Id"") ON DELETE CASCADE;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""RoleClaims"" ADD CONSTRAINT ""FK_RoleClaims_Roles_RoleId"" FOREIGN KEY (""RoleId"") REFERENCES identity.""Roles"" (""Id"") ON DELETE CASCADE;");

            // Reverse Address column type changes
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Ulke"" TYPE character varying(500) USING ""Ulke""::character varying;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Sehir"" TYPE character varying(500) USING ""Sehir""::character varying;");
            migrationBuilder.Sql(@"ALTER TABLE identity.""Addresses"" ALTER COLUMN ""Ilce"" TYPE character varying(500) USING ""Ilce""::character varying;");
        }
    }
}
