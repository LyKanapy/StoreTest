using System;

namespace Application.Products
{
    public class ProductDto
    {
        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

        
     }
}