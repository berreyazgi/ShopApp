using AutoMapper;
using ShopApp.Application.Siparis.Dtos;
using ShopApp.Application.SiparisUrunleri.Dtos;
using src.Monolith.ShopApp.Domain.Siparisler;


namespace ShopApp.Application.Mapping;

public class SiparisMapping : Profile
{
    public SiparisMapping()
    {
        CreateMap<SiparisEntity, ResultSiparisDto>()
            .ForCtorParam(nameof(ResultSiparisDto.DurumIsmi), opt => opt.MapFrom(src => src.Durum.DurumIsmi));
        CreateMap<SiparisEntity, GetByIdSiparisDto>().ReverseMap();

        CreateMap<src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri, ResultSiparisUrunleriDto>();
        CreateMap<src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri, GetByIdSiparisUrunleriDto>().ReverseMap();

    }
}