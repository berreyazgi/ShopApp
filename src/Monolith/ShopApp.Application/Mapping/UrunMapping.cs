using AutoMapper;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Mapping;

public class UrunMapping : Profile
{
    public UrunMapping()
    {
        CreateMap<Kategori, ResultKategoriDto>().ReverseMap();
        CreateMap<Urun, ResultUrunDto>().ReverseMap();
        CreateMap<UrunGorsel, ResultUrunGorselDto>().ReverseMap();
        CreateMap<UrunTur, ResultUrunTurDto>().ReverseMap();
        CreateMap<UrunOzellik, ResultUrunOzellikDto>().ReverseMap();

        CreateMap<Kategori, GetByIdKategoriDto>();
        CreateMap<Urun, GetByIdUrunDto>()
            .ForCtorParam(nameof(GetByIdUrunDto.KategoriAd), opt => opt.MapFrom(src => src.Kategori.KategoriAd));
        CreateMap<UrunGorsel, GetByIdUrunGorselDto>();
        CreateMap<UrunTur, GetByIdUrunTurDto>();
        CreateMap<UrunOzellik, GetByIdUrunOzellikDto>();
    }
}
