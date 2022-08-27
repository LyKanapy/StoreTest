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
        public string CategoryName { get; set; }
        public string SupplierName { get; set; }

    }
}
