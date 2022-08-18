using System;
using System.Collections.Generic;

namespace Domain
{
    public class Supplier
    {
        public Guid SupplierId { get; set; }
        public string CompanyName { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}