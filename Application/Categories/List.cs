using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Products;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class  Query : IRequest<List<CategoryDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<CategoryDto>>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                 _mapper = mapper;
                _context = context;
            }

            public async Task<List<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Using Automapper:
                var categories = await _context.Categories
                    .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return categories;

            }
        }


    }
}