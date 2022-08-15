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
    public class Edit
    {
        public class  Query : IRequest<Unit>
        {
            public CategoryDto Category { get; set; }
        }

        public class Handler : IRequestHandler<Query,Unit>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Category.CategoryId);
                category.CategoryName = request.Category.CategoryName;
                //  _mapper.Map(category, request.Category);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
