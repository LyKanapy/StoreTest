using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
            {
                public Product Product {get; set;}
            }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler (DataContext context) {

                _context = context;
                
            }

            public Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}