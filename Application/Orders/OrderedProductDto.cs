using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.OrderItems;

namespace Application.Orders
{
    public class OrderedProductDto
    {
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}