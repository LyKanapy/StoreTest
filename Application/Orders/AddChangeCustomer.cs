using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class AddChangeCustomer
    {
        public class Command : IRequest <Unit>
        {
            public Guid CustomerId{get; set;}
            public Guid OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders
                .FirstOrDefaultAsync(x=>x.OrderId==request.OrderId);
                var customer = await _context.Customers
                .Include(x=>x.Orders)
                .FirstOrDefaultAsync(x=>x.CustomerId==request.CustomerId);

                customer.Orders.Add(order);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}