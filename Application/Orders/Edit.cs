using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Edit
    {
        public class Command : IRequest <Unit>
        {
            public OrderDto Order { get; set; }
        }

        public class Handler : IRequestHandler<Command,Unit>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders
                    // .Include(a=>a.OrderItems)
                    // .ThenInclude(b => b.Product)
                    .FindAsync(request.Order.OrderId);

                _mapper.Map(request.Order, order);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}