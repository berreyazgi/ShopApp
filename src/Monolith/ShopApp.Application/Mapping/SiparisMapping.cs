using AutoMapper;
using ShopApp.Application.Dtos.SiparisDtos;
using ShopApp.Application.Dtos.SiparisUrunleriDto;
using src.Monolith.ShopApp.Domain.Siparisler;


namespace ShopApp.Application.Mapping;

public class SiparisMapping : Profile
{
    public SiparisMapping()
    {
        CreateMap<SiparisEntity, ResultSiparisDto>()
            .ForCtorParam(nameof(ResultSiparisDto.DurumIsmi), opt => opt.MapFrom(src => src.Durum.DurumIsmi));
        CreateMap<SiparisEntity, GetByIdSiparisDto>().ReverseMap();

        CreateMap<SiparisUrunleri, ResultSiparisUrunleriDto>();
        CreateMap<SiparisUrunleri, GetByIdSiparisUrunleriDto>().ReverseMap();

    }
}