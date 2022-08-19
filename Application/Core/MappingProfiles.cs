using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
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
            CreateMap<Order, OrderDto>();
            CreateMap<OrderItem, OrderedProductDto>()
                .ForMember(d=> d.ProductId, o=> o.MapFrom(s=>s.Product.ProductId))
                .ForMember(d=> d.ProductName, o=> o.MapFrom(s=>s.Product.ProductName))
                .ForMember(d=> d.ProductSku, o=> o.MapFrom(s=>s.Product.ProductSku))
                .ForMember(d=> d.ProductPrice, o=> o.MapFrom(s=>s.Product.ProductPrice))
                .ForMember(d=> d.ProductQuantity, o=> o.MapFrom(s=>s.Product.ProductQuantity));
        }
    }
}