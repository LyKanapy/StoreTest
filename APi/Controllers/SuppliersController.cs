using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Suppliers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace APi.Controllers
{
    public class SuppliersController : BaseApiController
    {
        
        private readonly IMediator _mediator;

        public SuppliersController (IMediator mediator) {

            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<SupplierDto>>> GetSuppliers()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierDto>> GetSupplier(Guid id)
        {
            return await _mediator.Send(new Details.Query{SupplierId = id});
        }

        
        [HttpPost]
        public async Task<Unit> GetSupplier(SupplierDto supplier)
        {
            return await _mediator.Send(new Create.Command{Supplier = supplier});
        }

        [HttpDelete("{id}")]
        public async Task<Unit> DeleteSupplier(Guid id)
        {
            return await _mediator.Send(new Delete.Command{SupplierId = id});
        }

        [HttpPut("{id}")]
        public async Task<Unit> EditSupplier(Guid id, SupplierDto supplier)
        {
            supplier.SupplierId=id;
            return await _mediator.Send(new Edit.Command{Supplier = supplier});
        }

    }
}