using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class List
    {
        public class Query : IRequest <List<Order>> 
        {

        }

        public class Handler : IRequestHandler<Query, List<Order>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<Order>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders
                    // .Include(a => a.OrderItems)
                    .ToListAsync();

                return orders;
            }
        }
    }
}