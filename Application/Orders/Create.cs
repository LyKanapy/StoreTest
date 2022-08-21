using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orders
{
    public class Create 
    {
    public class Command : IRequest
        {
            public OrderDto Order {get; set;}
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;


            public Handler(DataContext context, IMapper mapper)
            { 
                _mapper = mapper;
                _context = context;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var orderToAdd = _mapper.Map<OrderDto, Order>(request.Order);

                _context.Orders.Add(orderToAdd);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}