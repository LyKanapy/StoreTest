using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.OrderItems;

namespace Application.Orders
{
    public class OrderedProductsList
    {
        public ICollection<OrderItemDto> ProductsToRemove { get; set; }
        public ICollection<OrderItemDto> ProductsToUpdate { get; set; }
        public ICollection<OrderItemDto> ProductsToAdd { get; set; }

    }
}