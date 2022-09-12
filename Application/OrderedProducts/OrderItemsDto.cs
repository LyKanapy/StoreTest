using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.OrderItems
{
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}