using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopApp.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleSpecificProfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminProfilleri",
                schema: "kimlik",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    KullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    OlusturmaTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GuncellemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OlusturanKullaniciId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuncelleyenKullaniciId = table.Column<Guid>(type: "uuid", nullable: true)
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

            migrationBuilder.Sql(
                """
                INSERT INTO kimlik."AdminProfilleri" ("Id", "KullaniciId", "OlusturmaTarihi", "OlusturanKullaniciId")
                SELECT users."Id", users."Id", CURRENT_TIMESTAMP, users."Id"
                FROM identity."UserRoles" AS user_roles
                INNER JOIN identity."Roles" AS roles ON roles."Id" = user_roles."RoleId"
                INNER JOIN identity."Users" AS users ON users."Id" = user_roles."UserId"
                WHERE roles."NormalizedName" = 'ADMIN'
                ON CONFLICT ("KullaniciId") DO NOTHING;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminProfilleri",
                schema: "kimlik");
        }
    }
}
