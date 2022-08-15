using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Products;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class Delete
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
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

                var cats = await _context.Categories
                    .Include(c => c.Products)
                    .Where(a => a.CategoryId == request.Id)
                    .Select(x => new Category {
                        Products = x.Products.Select(xx => new Product {
                            ProductId = xx.ProductId,
                            ProductSku = xx.ProductSku,
                            ProductName = xx.ProductName,
                            ProductPrice = xx.ProductPrice,
                            ProductQuantity = xx.ProductQuantity,
                            Category = null
                            }).ToList()}
                    )
                    .FirstOrDefaultAsync();
                    
                var category = await _context.Categories.FindAsync(request.Id);

                _context.Remove(category);

                await _context.SaveChangesAsync();

                var prods = cats.Products;

                _context.Products.AddRange(prods);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}