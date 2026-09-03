using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SepetDtos;

namespace ShopApp.Application.Sepet.Queries;

public class GetSepet
{
    public class GetSepetQuery : IRequest<ResultSepetDto>
    {
        public Guid Id { get; set; }
    }

    [Authorize]
    public class GetSepetQueryHandler : IRequestHandler<GetSepetQuery, ResultSepetDto>
    {
        private readonly ISepetRepository _repository;
        private readonly IMapper _mapper;

        public GetSepetQueryHandler(ISepetRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ResultSepetDto> Handle(GetSepetQuery request, CancellationToken cancellationToken)
        {
            var sepet = await _repository.GetByIdAsync(request.Id, cancellationToken);
            return _mapper.Map<ResultSepetDto>(sepet);
        }
    }
}