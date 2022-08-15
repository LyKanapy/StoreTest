using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public  DbSet<Product> Products { get; set; }
        public  DbSet<Category> Categories { get; set; }
        // public  DbSet<Order> Orders { get; set; }
        // public  DbSet<OrderItem> OrderItems { get; set; }
        // public  DbSet<Customer> Customers { get; set; }
        // public  DbSet<Supplier> Suppliers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        { 
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasMany<Product>(a => a.Products)
                .WithOne (b=>b.Category)
                .HasForeignKey(c=>c.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<Product>()
            //     .HasOne(a => a.Category)
            //     .WithMany (b=>b.Products)
            //     .HasForeignKey(c=>c.CategoryId)
            //     .OnDelete(DeleteBehavior.Cascade);
            
            // builder.Entity<Order>()
            //     .HasOne(a => a.Customer)
            //     .WithMany (c=>c.Orders);

            // builder.Entity<Product>()
            //     .HasOne(a => a.Supplier)
            //     .WithMany (c=>c.Products);

            // builder.Entity<OrderItem>(x => x.HasKey(aa=>new {aa.OrderId, aa.ProductId}));
            // builder.Entity<OrderItem>()
            //     .HasOne(aa => aa.Order)
            //     .WithMany (c=>c.OrderItems)
            //     .HasForeignKey (aa=>aa.OrderId);
            // builder.Entity<OrderItem>()
            //     .HasOne(aa => aa.Product)
            //     .WithMany (c=>c.OrderItems)
            //     .HasForeignKey (aa=>aa.ProductId);
                
        }
    }
}