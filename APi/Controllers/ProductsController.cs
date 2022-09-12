using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace APi.Controllers
{
    public class ProductsController : BaseApiController
    {

        private readonly IMediator _mediator;

        public ProductsController (IMediator mediator) {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
        {
            return await _mediator.Send(new Details.Query{ProductId=id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateProduct(ProductDto product)
        {
            return await _mediator.Send(new Create.Command{Product = product});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditProduct(Guid id, ProductDto product)
        {
            product.ProductId=id;
            return await _mediator.Send(new Edit.Command{Product = product});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteProduct(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPut("{id}/{categoryId}")]
        public async Task<ActionResult<Unit>> AddToCategory(Guid id, Guid categoryId)
        {
            return await _mediator.Send(new AddToCategory.Command{ ProductId = id, CategoryId = categoryId});
        }




    }
}