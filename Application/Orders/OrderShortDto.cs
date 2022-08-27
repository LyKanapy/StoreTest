using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Customers;

namespace Application.Orders
{
    public class OrderShortDto
    {
        public Guid OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public double OrderTotal { get; set; }
        public string OrderStatus { get; set; }
        public CustomerShortDto Customer { get; set; }

    }
}