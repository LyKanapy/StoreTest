using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Supplier
    {
        public Guid SupplierId { get; set; }
        public string CompanyName { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}