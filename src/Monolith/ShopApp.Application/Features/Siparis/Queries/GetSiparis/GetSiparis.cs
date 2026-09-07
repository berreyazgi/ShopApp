using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Siparis.Dtos;

namespace ShopApp.Application.Features.Siparis.Queries;

public class GetSiparis
{
    public class GetSiparisQuery : IRequest<ResultSiparisDto>
    {
        public Guid Id { get; set; }
    }

    public class GetSiparisQueryHandler : IRequestHandler<GetSiparisQuery, ResultSiparisDto>
    {
        private readonly IShopAppDbContext _context;
        private readonly ICurrentCustomerContext _currentCustomerContext;
        private readonly IMapper _mapper;

        public GetSiparisQueryHandler(IShopAppDbContext context, ICurrentCustomerContext currentCustomerContext, IMapper mapper)
        {
            _context = context;
            _currentCustomerContext = currentCustomerContext;
            _mapper = mapper;
        }

        public async Task<ResultSiparisDto> Handle(GetSiparisQuery request, CancellationToken cancellationToken)
        {
            var customer = await _currentCustomerContext.GetRequiredAsync(cancellationToken);

            var siparis = await _context.Siparisler
                .AsNoTracking()
                .Include(s => s.Durum)
                .FirstOrDefaultAsync(s => s.Id == request.Id && s.MusteriId == customer.MusteriId, cancellationToken)
                ?? throw new KeyNotFoundException($"Sipariş '{request.Id}' bulunamadı.");

            return _mapper.Map<ResultSiparisDto>(siparis);
        }
    }
}