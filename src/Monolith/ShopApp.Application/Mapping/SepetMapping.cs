using AutoMapper;
using ShopApp.Application.Dtos.SepetDtos;
using ShopApp.Application.Dtos.SepetUrunDtos;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Mapping;

public class SepetMapping : Profile
{
    public SepetMapping()
    {
        CreateMap<SepetEntity,CreateSepetDto>().ReverseMap();
        CreateMap<SepetEntity, ResultSepetDto>().ReverseMap();
        CreateMap<SepetEntity, UpdateSepetDto>().ReverseMap();
        CreateMap<SepetEntity, GetByIdSepetDto>().ReverseMap();

        CreateMap<SepetUrunu, CreateSepetUrunDto>().ReverseMap();
        CreateMap<SepetUrunu, ResultSepetUrunDto>().ReverseMap();
        CreateMap<SepetUrunu, UpdateSepetUrunDto>().ReverseMap();
        CreateMap<SepetUrunu, GetByIdSepetUrunDto>().ReverseMap();
    }

}