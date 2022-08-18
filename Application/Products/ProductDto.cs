using System;
using System.Collections.Generic;
using Application.Categories;
using Domain;

namespace Application.Products
{
    public class ProductDto
    {
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public CategoryDto Category { get; set; }
        public SupplierDto Supplier { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }

    }
}
