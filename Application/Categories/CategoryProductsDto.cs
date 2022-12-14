using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products;

namespace Application.Categories
{
    public class CategoryProductsDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

        public ICollection<ProductDto> Products {get; set;}
    }
}