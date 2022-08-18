using System;
using System.Collections.Generic;

namespace Domain
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}