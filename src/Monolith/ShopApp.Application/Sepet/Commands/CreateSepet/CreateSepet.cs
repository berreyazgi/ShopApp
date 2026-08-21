using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Sepet.Queries;
using SepetEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.Sepet;

namespace ShopApp.Application.Sepet.Commands.CreateSepet;

public class CreateSepet
{
    public record Command(Guid SepetId, string MusteriId, Guid SepetUrunId, int YeniAdet) : IRequest<SepetDto>;
    public class CreateSepetCommand : IRequest<Guid>
    {
        public string MusteriId { get; set; } = null!;
        public Guid OlusturanKullaniciId { get; set; }
        public int YeniAdet { get; set; }
    }

    [Authorize]
    public class CreateSepetCommandHandler : IRequestHandler<CreateSepetCommand, Guid>
    {
        private readonly ISepetRepository _repository;
        private readonly IUrunRepository _UrunRepository;
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public CreateSepetCommandHandler(ISepetRepository repository, IUrunRepository UrunRepository, IIdentityService identityService, IMapper mapper)
        {
            _repository = repository;
            _UrunRepository = UrunRepository;
            
        }

        public async Task<Guid> Handle(CreateSepetCommand request, CancellationToken cancellationToken)
        {
            var sepet = SepetEntity.Olustur(request.MusteriId, request.OlusturanKullaniciId);

            await _repository.AddAsync(sepet, cancellationToken);

            return sepet.Id;
        }
    }
}