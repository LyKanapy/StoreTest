using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Customers
{
    public class Details
{
        public class Query : IRequest <CustomerDto>
        {
            public Guid CustomerId { get; set; }
        }

        public class Handler : IRequestHandler<Query, CustomerDto>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
            _context = context;
            _mapper = mapper;
            }

            public Task<CustomerDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = _context.Customers
                    .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync (x=> x.CustomerId == request.CustomerId);

                return order;
            }
        }
    }
}