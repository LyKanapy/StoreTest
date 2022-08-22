using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Customers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace APi.Controllers
{
    public class CustomersController : BaseApiController
{

        private readonly IMediator _mediator;

        public CustomersController (IMediator mediator) {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<CustomerDto>>> GetCustomers()
        {
            return await _mediator.Send(new List.Query());
        }
    
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCategory(Guid id)
        {
            return await _mediator.Send(new Details.Query{CustomerId = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditCategory(Guid id, CustomerDto customer)
        {
            customer.CustomerId=id;
            return await _mediator.Send(new Edit.Query{Customer = customer});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateCustomer(CustomerDto customer)
        {
            return await _mediator.Send(new Create.Command{Customer = customer});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteCustomer (Guid id) 
        {
            return await _mediator.Send(new Delete.Command{CustomerId = id});
        }

    }
}