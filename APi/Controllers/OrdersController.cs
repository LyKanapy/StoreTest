using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Orders;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace APi.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IMediator _mediator;

        public OrdersController (IMediator mediator) {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(Guid id)
        {
            return await _mediator.Send(new Details.Query{OrderId = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateOrder(OrderDto order)
        {
            return await _mediator.Send(new Create.Command{Order = order});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditOrder(Guid id, OrderDto order)
        {
            order.OrderId=id;
            return await _mediator.Send(new Edit.Command{Order = order});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteOrder(Guid id)
        {
            return await _mediator.Send(new Delete.Command{OrderId = id});
        }
    }
}