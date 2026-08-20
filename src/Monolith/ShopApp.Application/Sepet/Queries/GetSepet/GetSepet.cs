using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.Sepet.Queries;

public class GetSepet
{
    public class GetSepetQuery : IRequest<SepetDto>
    {
        public Guid Id { get; set; }
    }
    
    [Authorize]
    public class GetSepetQueryHandler : IRequestHandler<GetSepetQuery, SepetDto>
    {
        private readonly ISepetRepository _repository;
        private readonly IMapper _mapper;

        public GetSepetQueryHandler(ISepetRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<SepetDto> Handle(GetSepetQuery request, CancellationToken cancellationToken)
        {
            var sepet = await _repository.GetByIdAsync(request.Id, cancellationToken);
            return _mapper.Map<SepetDto>(sepet);
        }
    }
}