using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class Create
    {
        public class Command : IRequest<Unit>
        {
            public CategoryDto Category;
        }

        public class Handler : IRequestHandler<Command, Unit>
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
                // Using Automapper
                
                var categoryToAdd = _mapper.Map<CategoryDto, Category>(request.Category);
                
                // Using simple expression
                //
                // var categoryToAdd = new Category();
                // categoryToAdd.CategoryName = request.Category.CategoryName;

                _context.Categories.Add(categoryToAdd);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}