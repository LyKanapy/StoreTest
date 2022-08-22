using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Create
{
        public class Command : IRequest
            {
                public CustomerDto Customer {get; set;}
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
                var customerToAdd = _mapper.Map<CustomerDto, Customer>(request.Customer);

                _context.Customers.Add(customerToAdd);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}