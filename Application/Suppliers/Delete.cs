using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Suppliers
{
    public class Delete
    {
        public class Command : IRequest<Unit>
        {
            public Guid SupplierId { get; set; }
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
                var supplier = await _context.Suppliers.FindAsync(request.SupplierId);

                _context.Remove(supplier);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}