using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Products;

namespace Application.Products
{
    public class List
    {
        public class  Query : IRequest<List<ProductDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<ProductDto>>
        
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = _context.Products
                    .Include(x => x.Category)
                    .Select(x => new ProductDto 
                    {
                        ProductId = x.ProductId,
                        ProductSku= x.ProductSku,
                        ProductName = x.ProductName,
                        ProductPrice = x.ProductPrice,
                        ProductQuantity = x.ProductQuantity,
                        CategoryId = x.Category.CategoryId,
                        CategoryName = x.Category.CategoryName
                    })
                    ;
                   

                return await products.ToListAsync();
            }
        }


    }
}