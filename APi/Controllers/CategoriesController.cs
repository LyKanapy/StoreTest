using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace APi.Controllers
{
    public class CategoriesController : BaseApiController
    {

        private readonly IMediator _mediator;

        public CategoriesController (IMediator mediator) {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}