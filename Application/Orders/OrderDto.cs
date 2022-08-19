using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products;
using Domain;

namespace Application.Orders
{
    public class OrderDto
    {
        public Guid OrderId { get; set; }

        public string OrderNumber { get; set; }
        public DateTime Orderdate { get; set; }
        public double OrderTotal { get; set; }
        public string OrderStatus { get; set; }
        public string OrderComment { get; set; }
        // public Customer Customer { get; set; }

        public ICollection<OrderedProductDto> OrderedProducts { get; set; }
    }
}