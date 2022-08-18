using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerSurname { get; set; }
        public int CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAdressCountry { get; set; }
        public string CustomerAdressCity { get; set; }
        public string CustomerAdressStreet { get; set; }
        public string CustomerAdressHouse { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}