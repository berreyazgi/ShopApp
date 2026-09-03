using AutoMapper;
using ShopApp.Application.Dtos.SiparisDtos;
using ShopApp.Application.Dtos.SiparisUrunleriDto;
using src.Monolith.ShopApp.Domain.Siparisler;


namespace ShopApp.Application.Mapping;

public class SiparisMapping : Profile
{
    public SiparisMapping()
    {
        CreateMap<SiparisEntity,CreateSiparisDto>().ReverseMap();
        CreateMap<SiparisEntity, ResultSiparisDto>().ReverseMap();
        CreateMap<SiparisEntity, UpdateSiparisDto>().ReverseMap();
        CreateMap<SiparisEntity, GetByIdSiparisDto>().ReverseMap();

        CreateMap<SiparisUrunleri, CreateSiparisUrunleriDto>().ReverseMap();
        CreateMap<SiparisUrunleri, ResultSiparisUrunleriDto>().ReverseMap();
        CreateMap<SiparisUrunleri, UpdateSiparisUrunleriDto>().ReverseMap();
        CreateMap<SiparisUrunleri, GetByIdSiparisUrunleriDto>().ReverseMap();

    }
}