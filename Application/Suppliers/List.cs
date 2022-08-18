using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Suppliers
{
    public class List
    {
        public class Query : IRequest<List<SupplierDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<SupplierDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<SupplierDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var suppliers = await _context.Suppliers
                    .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return suppliers;

            }
        }
    }
}