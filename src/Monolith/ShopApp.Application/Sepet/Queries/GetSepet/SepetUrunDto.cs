using AutoMapper;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Sepet.Queries;

public class SepetUrunDto
{
    public Guid UrunTurId { get; set; }

    public int UrunAdet { get; set; }
    
    public int UrunMiktar { get; set; }

}