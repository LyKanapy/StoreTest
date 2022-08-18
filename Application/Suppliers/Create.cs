using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Suppliers
{
    public class Create
        {
            public class Command : IRequest
                {
                    public SupplierDto Supplier;
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
                    
                    var supplierToAdd = _mapper.Map<SupplierDto, Supplier>(request.Supplier);

                    _context.Suppliers.Add(supplierToAdd);
                   
                    await _context.SaveChangesAsync();
                    
                    return Unit.Value;
                }
            }
        }
}