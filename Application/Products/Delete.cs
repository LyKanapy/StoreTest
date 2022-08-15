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

namespace Application.Products
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
                    
                var product = await _context.Products.FindAsync(request.Id);

                _context.Remove(product);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}