using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Products;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class _List
    {
        public class  Query : IRequest<List<CategoryProductsDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<CategoryProductsDto>>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                 _mapper = mapper;
                _context = context;
            }

            public async Task<List<CategoryProductsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Using Automapper:
                var categories = await _context.Categories
                    .ProjectTo<CategoryProductsDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return categories;

                // Using queries:
                // 
                // var categories = _context.Categories
                //     .Include(c => c.Products)
                //     .Select(x => new CategoryDto {
                //         CategoryId = x.CategoryId,
                //         CategoryName = x.CategoryName,
                //         Products = x.Products.Select(xx => new ProductDto {
                //             ProductId = xx.ProductId,
                //             ProductSku = xx.ProductSku,
                //             ProductName = xx.ProductName,
                //             ProductPrice = xx.ProductPrice,
                //             ProductQuantity = xx.ProductQuantity,
                //             CategoryId = xx.CurrentCategoryId,
                //             }).ToList()
                //     });
                // return await categories.ToListAsync();

            }
        }


    }
}