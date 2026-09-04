using AutoMapper;
using ShopApp.Application.Sepet.Dtos;
using ShopApp.Application.SepetUrunleri.Dtos;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Mapping;

public class SepetMapping : Profile
{
    public SepetMapping()
    {
        CreateMap<SepetEntity, ResultSepetDto>();
        CreateMap<SepetEntity, GetByIdSepetDto>().ReverseMap();

        CreateMap<SepetUrunu, ResultSepetUrunDto>();
        CreateMap<SepetUrunu, GetByIdSepetUrunDto>().ReverseMap();
    }

}