using AutoMapper;
using MediatR;
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

    public class GetSepetQueryHandler : IRequestHandler<GetSepetQuery, ResultSepetDto>
    {
        private readonly IShopAppDbContext _context;
        private readonly ICurrentCustomerContext _currentCustomerContext;
        private readonly IMapper _mapper;

        public GetSepetQueryHandler(IShopAppDbContext context, ICurrentCustomerContext currentCustomerContext, IMapper mapper)
        {
            _context = context;
            _currentCustomerContext = currentCustomerContext;
            _mapper = mapper;
        }

        public async Task<ResultSepetDto> Handle(GetSepetQuery request, CancellationToken cancellationToken)
        {
            var customer = await _currentCustomerContext.GetRequiredAsync(cancellationToken);

            var sepet = await _context.Sepetler
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == request.Id && s.MusteriId == customer.MusteriId, cancellationToken)
                ?? throw new KeyNotFoundException($"Sepet '{request.Id}' bulunamadı.");

            return _mapper.Map<ResultSepetDto>(sepet);
        }
    }
}