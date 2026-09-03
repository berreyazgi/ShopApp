using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using ShopApp.Application.Dtos.SiparisDtos;
using ShopApp.Application.Services.SiparisServices;

namespace ShopApp.Application.Siparis.Queries;

public class GetSiparis
{
    public class GetSiparisQuery : IRequest<ResultSiparisDto>
    {
        public Guid Id { get; set; }
    }

    [Authorize]
    public class GetSiparisQueryHandler : IRequestHandler<GetSiparisQuery, ResultSiparisDto>
    {
        private readonly ISiparisService _siparisService;
        private readonly IMapper _mapper;

        public GetSiparisQueryHandler(ISiparisService siparisService, IMapper mapper)
        {
            _siparisService = siparisService;
            _mapper = mapper;
        }
        public async Task<ResultSiparisDto> Handle(GetSiparisQuery request, CancellationToken cancellationToken)
        {
            var sepet = await _siparisService.GetByIdAsync(request.Id, cancellationToken);
            return _mapper.Map<ResultSiparisDto>(sepet);
        }
    }
}