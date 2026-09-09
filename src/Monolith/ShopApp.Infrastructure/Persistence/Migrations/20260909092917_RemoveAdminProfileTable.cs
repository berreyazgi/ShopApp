using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAdminProfileTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminProfilleri",
                schema: "kimlik");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminProfilleri",
                schema: "kimlik",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true),
                    KullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminProfilleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminProfilleri_Users_KullaniciId",
                        column: x => x.KullaniciId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminProfilleri_KullaniciId",
                schema: "kimlik",
                table: "AdminProfilleri",
                column: "KullaniciId",
                unique: true);
        }
    }
}
