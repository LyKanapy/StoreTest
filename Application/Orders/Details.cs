using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Details
    {
        public class Query : IRequest <OrderDto>
        {
            public Guid OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Query, OrderDto>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
            _context = context;
            _mapper = mapper;
            }

            public Task<OrderDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = _context.Orders
                    .Include(a=> a.OrderItems)
                    .ThenInclude(b=>b.Product)
                    .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync (x=> x.OrderId == request.OrderId);

                return order;
            }
        }
    }
}