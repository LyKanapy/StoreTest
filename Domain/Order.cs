using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Order
    {
        public Guid OrderId { get; set; }

        public string OrderNumber { get; set; }
        public DateTime Orderdate { get; set; }
        public double OrderTotal { get; set; }
        public string OrderStatus { get; set; }
        public string OrderComment { get; set; }
        public Customer Customer { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}