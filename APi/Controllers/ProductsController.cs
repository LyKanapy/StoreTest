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
    }
}