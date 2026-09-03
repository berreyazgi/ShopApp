using AutoMapper;
using ShopApp.Application.Dtos.SepetDtos;
using ShopApp.Application.Dtos.SepetUrunDtos;
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