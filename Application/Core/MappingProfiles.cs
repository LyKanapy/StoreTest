using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
using Application.Customers;
using Application.OrderItems;
using Application.Orders;
using Application.Products;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles ()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();

            CreateMap<Category, CategoryProductsDto>();

            CreateMap<ProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(d=>d.SupplierName, o => o.MapFrom(x=>x.Supplier.CompanyName))
                .ForMember(d=>d.CategoryName, o => o.MapFrom(x=>x.Category.CategoryName));

            CreateMap<Supplier, SupplierDto>();
            CreateMap<SupplierDto, Supplier>();

            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderShortDto>();
            
        // Mapping many to many relationship between orders and products (shows what products are in the order)

            CreateMap<OrderItem, OrderedProductDto>()
                .ForMember(d=>d.ProductId, o=> o.MapFrom(x=>x.Product.ProductId))
                .ForMember(d=>d.ProductSku, o=> o.MapFrom(x=>x.Product.ProductSku))
                .ForMember(d=>d.ProductName, o=> o.MapFrom(x=>x.Product.ProductName))
                .ForMember(d=>d.ProductPrice, o=> o.MapFrom(x=>x.Product.ProductPrice))
                ;
                
            CreateMap<Order, OrderDto>()
                .ForMember(d=>d.OrderedProducts, o => o.MapFrom(x=>x.OrderItems))
                ;


        // Mappings for customers
        
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<Customer, CustomerShortDto>();

        }

        
    }
}