using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SepetDurumLookupConfiguration : IEntityTypeConfiguration<SepetDurumLookup>
{
    public void Configure(
        EntityTypeBuilder<SepetDurumLookup> builder)
    {
        builder.HasData(
            new SepetDurumLookup
            {
                Id = (int)SepetDurum.Aktif,
                DurumIsmi = nameof(SepetDurum.Aktif)
            },
            new SepetDurumLookup
            {
                Id = (int)SepetDurum.AktifDegil,
                DurumIsmi = nameof(SepetDurum.AktifDegil)
            },
            new SepetDurumLookup
            {
                Id = (int)SepetDurum.Tamamlanmis,
                DurumIsmi = nameof(SepetDurum.Tamamlanmis)
            },
            new SepetDurumLookup
            {
                Id = (int)SepetDurum.IptalEdilmis,
                DurumIsmi = nameof(SepetDurum.IptalEdilmis)
            });
    }
}