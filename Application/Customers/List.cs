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
public class List
    {
        public class  Query : IRequest<List<CustomerDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<CustomerDto>>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
             _mapper = mapper;
                _context = context;
            }

            public async Task<List<CustomerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
               var customers = await _context.Customers
                    .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return customers;

            }
        }
    }
}