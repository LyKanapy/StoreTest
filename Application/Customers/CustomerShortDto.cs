using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Customers
{
    public class CustomerShortDto
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerSurname { get; set; }
    }
}