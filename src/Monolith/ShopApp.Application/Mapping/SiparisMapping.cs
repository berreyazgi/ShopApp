using AutoMapper;
using ShopApp.Application.Features.Siparis.Dtos;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

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