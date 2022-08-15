using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Products;
using AutoMapper.QueryableExtensions;
using AutoMapper;

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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
             _mapper = mapper;
                _context = context;
            }

            public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
               var products = await _context.Products
                    .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return products;

                // Using queries:
                // 
                // var products = _context.Products
                //     .Include(x => x.Category)
                //     .Select(x => new ProductDto 
                //     {
                //         ProductId = x.ProductId,
                //         ProductSku= x.ProductSku,
                //         ProductName = x.ProductName,
                //         ProductPrice = x.ProductPrice,
                //         ProductQuantity = x.ProductQuantity,
                //         CategoryId = x.Category.CategoryId,
                //         CategoryName = x.Category.CategoryName
                //     });
                // 
                // return await products.ToListAsync();
            }
        }


    }
}