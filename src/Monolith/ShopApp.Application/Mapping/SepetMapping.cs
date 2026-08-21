using AutoMapper;
using SepetEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.Sepet;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using ShopApp.Application.Sepet.Queries;

namespace ShopApp.Application.Mapping;

public class SepetMapping : Profile
{
    public SepetMapping()
    {
        CreateMap<SepetEntity, SepetDto>()
            .ForMember(dest => dest.DurumIsmi,
                opt => opt.MapFrom(src => src.Durum != null ? src.Durum.DurumIsmi : null));

        CreateMap<SepetUrunu, SepetUrunDto>();
    }
}