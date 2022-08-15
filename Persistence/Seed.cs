using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Categories.Any()) return;
 
            var categories = new List<Category> {
                new Category {
                    CategoryName = "Category 01"
                },
                new Category {
                    CategoryName = "Category 02"
                }
            };

            var products = new List<Product>
            {
                new Product
                    {
                        ProductName = "Product 1",
                        ProductSku = "Pro001",
                        ProductPrice = 1.99,
                        ProductQuantity = 5,
                        Category = categories[0]
                    },
                new Product
                    {
                        ProductName = "Product 2",
                        ProductSku = "Pro001",
                        ProductPrice = 2.99,
                        ProductQuantity = 10,
                        Category = categories[1]
                    },
                new Product
                    {
                        ProductName = "Product 3",
                        ProductSku = "Pro001",
                        ProductPrice = 3.99,
                        ProductQuantity = 1,
                        Category = categories[0]
                    },
                new Product
                    {
                        ProductName = "Product 4",
                        ProductSku = "Pro001",
                        ProductPrice = 4.99,
                        ProductQuantity = 5,
                        Category = categories[1]
                    },
                };

            await context.Categories.AddRangeAsync(categories);    
            await context.Products.AddRangeAsync(products);    
            await context.SaveChangesAsync();
        }
    }
}