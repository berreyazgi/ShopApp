using System.ComponentModel.DataAnnotations;
using MediatR;
using Microsoft.AspNetCore.Http;
using ShopApp.Application.Dtos.SiparisDtos;

namespace ShopApp.Application.Siparis.Commands.CreateSiparis;

public class CreateSiparis
{
    public record Command(Guid SiparisId, Guid MusteriId,Guid UrunId): IRequest<ResultSiparisDto>;

    public class CreateSiparisCommand : IRequest<Guid>
    {
        public Guid SiparisId { get; set; }
        public Guid MusteriId { get; set; }
        public Guid UrunId { get; set; }
    }


}