using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
using Application.Customers;
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
            CreateMap<Product, ProductDto>();
            CreateMap<Supplier, SupplierDto>();
            CreateMap<SupplierDto, Supplier>();
            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderShortDto>();
            
        // Mapping many to many relationship between orders and products (shows what products are in the order)
            CreateMap<Product, OrderedProductDto>();
            CreateMap<Order, OrderDto>()
                .ForMember(d=>d.OrderedProducts, o => o.MapFrom(x=>x.OrderItems.Select(y=> y.Product)));

        // Mappings for customers
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<Customer, CustomerShortDto>();

        }

        
    }
}