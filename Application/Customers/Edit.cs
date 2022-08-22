using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Edit
{
        public class  Query : IRequest<Unit>
        {
            public CustomerDto Customer { get; set; }
        }

        public class Handler : IRequestHandler<Query,Unit>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Query request, CancellationToken cancellationToken)
            {
                var customer = await _context.Customers.FindAsync(request.Customer.CustomerId);
                _mapper.Map(request.Customer, customer);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}