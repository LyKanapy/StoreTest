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
    public class Delete
    {
        public class Command : IRequest <Unit>
        {
            public Guid CustomerId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
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
                var customer = await _context.Customers.FindAsync(request.CustomerId);

                 _context.Remove(customer);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}