using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.OrderItems;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class UpdateOrderedProducts 
    {
    public class Command : IRequest
        {
            public OrderedProductsList OrderedProductsList { get; set; }
            public Guid OrderId { get; set; }        
        
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;


            public Handler(DataContext context, IMapper mapper)
            { 
                _mapper = mapper;
                _context = context;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var orderItems = await _context.OrderItems
                    .Where(x => x.OrderId == request.OrderId)
                    .ToListAsync();

                // Edit

                var productsToUpdate = request.OrderedProductsList.ProductsToUpdate;

                foreach (OrderItemDto e in productsToUpdate)
                {
                    
                        var orderItem = orderItems.Single(z => z.ProductId == e.ProductId);
                        var product = await _context.Products.FirstOrDefaultAsync(x=>x.ProductId==e.ProductId);   
                        var quantityBefore = orderItem.Quantity;

                        orderItem.Quantity = e.Quantity;
                        orderItem.UnitPrice = e.Quantity * orderItem.Product.ProductPrice;

                        product.ProductQuantity=product.ProductQuantity + quantityBefore - e.Quantity;
                    
                }


                // Remove

                var productsToRemove = request.OrderedProductsList.ProductsToRemove;

                foreach (OrderItemDto e in productsToRemove)
                {

                    var orderItem = orderItems.Single(z => z.ProductId == e.ProductId);    

                    _context.OrderItems.Remove(orderItem);

                        var productToChangeQuantity = await _context.Products.FirstOrDefaultAsync(x=>x.ProductId==e.ProductId);   
                        productToChangeQuantity.ProductQuantity=productToChangeQuantity.ProductQuantity + e.Quantity;
                }
                    
                // Add 

                var productsToAdd = request.OrderedProductsList.ProductsToAdd;
                foreach (OrderItemDto e in productsToAdd)
                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(x=>x.ProductId==e.ProductId);
                    
                    var orderItem = new OrderItem {

                        OrderId = request.OrderId,
                        ProductId = e.ProductId,
                        Quantity = e.Quantity,
                        UnitPrice = e.Quantity * product.ProductPrice

                    };

                        var productToChangeQuantity = await _context.Products.FirstOrDefaultAsync(x=>x.ProductId==e.ProductId);   
                        productToChangeQuantity.ProductQuantity=productToChangeQuantity.ProductQuantity-e.Quantity;


                    _context.OrderItems.Add(orderItem);
                
                }

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}