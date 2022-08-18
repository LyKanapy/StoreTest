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
    public class Details
    {
        public class Query : IRequest<SupplierDto> 
        {
            public Guid SupplierId { get; set; }
        }

        public class Handler : IRequestHandler<Query, SupplierDto>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<SupplierDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var supplier = await _context.Suppliers
                    .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.SupplierId == request.SupplierId);

                return supplier;
            }
        }
    }
}