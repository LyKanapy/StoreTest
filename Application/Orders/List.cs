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

namespace Application.Orders
{
    public class List
    {
        public class Query : IRequest <List<OrderShortDto>> 
        {

        }

        public class Handler : IRequestHandler<Query, List<OrderShortDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<OrderShortDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Manual query
                // 
                // var orders = await _context.Orders
                //     .Include(a => a.OrderItems)
                //     .ThenInclude(b => b.Product)
                //     .Select(x => new OrderDto {
                //         OrderId= x.OrderId,
                //         OrderComment= x.OrderComment,
                //         Orderdate= x.Orderdate,
                //         OrderNumber= x.OrderNumber,
                //         OrderStatus= x.OrderStatus,
                //         OrderTotal= x.OrderTotal,
                //         OrderedProducts = x.OrderItems.Select(xx => new OrderedProductDto {
                //             ProductId = xx.Product.ProductId,
                //             ProductName = xx.Product.ProductName,
                //             ProductPrice = xx.Product.ProductPrice,
                //             ProductQuantity = xx.Product.ProductQuantity,
                //             ProductSku = xx.Product.ProductSku
                //         }).ToList()
                //     })
                //     .ToListAsync();

                // Automapper
                // 
                var orders = await _context.Orders
                    .Include(a => a.OrderItems)
                    .ThenInclude(b => b.Product)
                    .ProjectTo<OrderShortDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return orders;
            }
        }
    }
}