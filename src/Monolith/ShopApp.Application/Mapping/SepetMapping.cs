using AutoMapper;
using ShopApp.Application.Features.Sepet.Dtos;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Mapping;

public class SepetMapping : Profile
{
    public SepetMapping()
    {
        CreateMap<SepetEntity, ResultSepetDto>();
        CreateMap<SepetEntity, GetByIdSepetDto>().ReverseMap();

        // ResultSepetUrunDto is built manually in GetSepetUrunleri/GetSepetUrunu —
        // it resolves UrunId/UrunAd/GorselUrl/Ozellikler through UrunTur/Urun,
        // which AutoMapper can't reach from SepetUrunu alone.
        CreateMap<SepetUrunu, GetByIdSepetUrunDto>().ReverseMap();
    }

}