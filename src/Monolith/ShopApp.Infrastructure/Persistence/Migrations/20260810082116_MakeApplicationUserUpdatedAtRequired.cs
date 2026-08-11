using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MakeApplicationUserUpdatedAtRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "durum",
                schema: "identity",
                table: "Users",
                newName: "Durum");

            migrationBuilder.Sql("""
                ALTER TABLE identity."Users"
                ALTER COLUMN "OlusturmaTarihi" TYPE timestamp with time zone
                USING CASE
                    WHEN "OlusturmaTarihi" IS NULL OR btrim("OlusturmaTarihi") = '' THEN CURRENT_TIMESTAMP
                    ELSE "OlusturmaTarihi"::timestamp with time zone
                END;
                """);

            migrationBuilder.Sql("""
                ALTER TABLE identity."Users"
                ALTER COLUMN "GuncellemeTarihi" TYPE timestamp with time zone
                USING CASE
                    WHEN "GuncellemeTarihi" IS NULL OR btrim("GuncellemeTarihi") = '' THEN CURRENT_TIMESTAMP
                    ELSE "GuncellemeTarihi"::timestamp with time zone
                END;

                ALTER TABLE identity."Users"
                ALTER COLUMN "GuncellemeTarihi" SET NOT NULL;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Durum",
                schema: "identity",
                table: "Users",
                newName: "durum");

            migrationBuilder.AlterColumn<string>(
                name: "OlusturmaTarihi",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "GuncellemeTarihi",
                schema: "identity",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }
    }
}
