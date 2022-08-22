using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Orders
{
    public class OrderShortDto
    {
        public Guid OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime Orderdate { get; set; }
        public string OrderStatus { get; set; }

    }
}