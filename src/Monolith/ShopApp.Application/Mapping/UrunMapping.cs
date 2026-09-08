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
    }
}
