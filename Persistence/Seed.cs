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

            var suppliers = new List<Supplier> {
                new Supplier {
                    CompanyName = "Company 01"
                },
                new Supplier {
                    CompanyName = "Company 02"
                }
            };

            var customers = new List<Customer> {
                new Customer {
                    CustomerName = "Ly",
                    CustomerSurname = "Kanapy",
                    CustomerPhone = "3568456321",
                    CustomerEmail = "customer@mail.com",
                    CustomerAdressCountry = "Estonia",
                    CustomerAdressCity = "Dunnen",
                    CustomerAdressStreet = "Sutien",
                    CustomerAdressHouse = "15",
                },
                new Customer {
                    CustomerName = "Bob",
                    CustomerSurname = "Stephen",
                    CustomerPhone = "5166658489",
                    CustomerEmail = "customer@mail.com",
                    CustomerAdressCountry = "India",
                    CustomerAdressCity = "Dephi",
                    CustomerAdressStreet = "Streto",
                    CustomerAdressHouse = "1053",
                }
            };

            var orders = new List<Order> {
                new Order {
                    OrderNumber = "Order01",
                    OrderStatus = "Active",
                    OrderTotal = 9.99,
                    OrderComment = "This is comment",
                    Customer = customers[0]
                },
                new Order {
                    OrderNumber = "Order02",
                    OrderStatus = "Fullfilled",
                    OrderTotal = 6.99,
                    OrderComment = "This is comment",
                    Customer = customers[1]
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
                        Category = categories[0],
                        Supplier = suppliers[1]
                    },
                new Product
                    {
                        ProductName = "Product 2",
                        ProductSku = "Pro001",
                        ProductPrice = 2.99,
                        ProductQuantity = 10,
                        Category = categories[1],
                        Supplier = suppliers[0]
                    },
                new Product
                    {
                        ProductName = "Product 3",
                        ProductSku = "Pro001",
                        ProductPrice = 3.99,
                        ProductQuantity = 1,
                        Category = categories[0],
                        Supplier = suppliers[0]
                    },
                new Product
                    {
                        ProductName = "Product 4",
                        ProductSku = "Pro001",
                        ProductPrice = 4.99,
                        ProductQuantity = 5,
                        Category = categories[1],
                        Supplier = suppliers[0]
                    },
                };

            var orderitem = new List<OrderItem> {
                new OrderItem {
                    Order = orders[0],
                    Product = products[1]
                },
                new OrderItem {
                    Order = orders[1],
                    Product = products[1]
                },
                new OrderItem {
                    Order = orders[1],
                    Product = products[2]
                }
            };
                

            await context.Categories.AddRangeAsync(categories);    
            await context.Products.AddRangeAsync(products);    
            await context.Suppliers.AddRangeAsync(suppliers);    
            await context.Orders.AddRangeAsync(orders);    
            await context.OrderItems.AddRangeAsync(orderitem);    
            await context.SaveChangesAsync();
        }
    }
}