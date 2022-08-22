using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class AddToCategory
    {
        public class Command : IRequest<Unit> 
        {
            public Guid ProductId { get; set; }
            public Guid CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var product = await _context.Products
                    .FirstOrDefaultAsync(x=>x.ProductId==request.ProductId);
                var category = await _context.Categories
                    .Include(x=> x.Products)
                    .FirstOrDefaultAsync(x=>x.CategoryId==request.CategoryId);

                category.Products.Add(product);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}