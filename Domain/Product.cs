using System;

namespace Domain
{
    public class Product
    {

        public Guid ProductId { get; set; }
        public string ProductSku { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public Guid? CategoryId { get; set; }
        public Category Category { get; set; }
        // public Supplier Supplier { get; set; }
        // public ICollection<OrderItem> OrderItems { get; set; }
        
     }
}