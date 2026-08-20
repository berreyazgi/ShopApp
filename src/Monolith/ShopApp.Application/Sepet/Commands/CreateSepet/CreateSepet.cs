using MediatR;
using Microsoft.AspNetCore.Authorization;
using ShopApp.Application.Abstractions;
using SepetEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.Sepet;

namespace ShopApp.Application.Sepet.Commands.CreateSepet;

public class CreateSepet
{
    public class CreateSepetCommand : IRequest<Guid>
    {
        public string MusteriId { get; set; } = null!;
        public Guid OlusturanKullaniciId { get; set; }
    }

    [Authorize]
    public class CreateSepetCommandHandler : IRequestHandler<CreateSepetCommand, Guid>
    {
        private readonly ISepetRepository _repository;

        public CreateSepetCommandHandler(ISepetRepository repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateSepetCommand request, CancellationToken cancellationToken)
        {
            var sepet = SepetEntity.Olustur(request.MusteriId, request.OlusturanKullaniciId);

            await _repository.AddAsync(sepet, cancellationToken);

            return sepet.Id;
        }
    }
}