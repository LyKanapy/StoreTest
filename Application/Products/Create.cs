using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
            {
                public ProductDto Product {get; set;}
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
                var productToAdd = _mapper.Map<ProductDto, Product>(request.Product);

                

                // var productToAdd = new Product();
                
                // productToAdd.ProductName = request.Product.ProductName;
                // productToAdd.ProductPrice = request.Product.ProductPrice;
                // productToAdd.ProductQuantity = request.Product.ProductQuantity;
                // productToAdd.ProductSku = request.Product.ProductSku;

                _context.Products.Add(productToAdd);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}