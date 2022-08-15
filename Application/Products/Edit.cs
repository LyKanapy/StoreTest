using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Edit
    {
        public class  Command : IRequest<Unit>
        {
            public ProductDto Product { get; set; }
        }

        public class Handler : IRequestHandler<Command,Unit>
        
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Product.ProductId);

                _mapper.Map(request.Product, product);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
