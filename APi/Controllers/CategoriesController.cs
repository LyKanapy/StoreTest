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
    
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
        {
            var result = await _mediator.Send(new Details.Query{CategoryId = id});
            return result;
        }

        [HttpPut("edit/{id}")]
        public async Task<ActionResult<Unit>> EditCategory(Guid id, CategoryDto category)
        {
            category.CategoryId=id;
            return await _mediator.Send(new Edit.Query{Category = category});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateCategory(CategoryDto category)
        {
            return await _mediator.Send(new Create.Command{Category = category});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteCategory (Guid id) 
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }

    }
} 