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

namespace Application.Categories
{
    public class Details
    {
        public class  Query : IRequest<CategoryProductsDto>
        {
            public Guid CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Query,CategoryProductsDto>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CategoryProductsDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.Categories
                    .ProjectTo<CategoryProductsDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync (x=> x.CategoryId == request.CategoryId);

                return categories;
            }
        }
    }
}
