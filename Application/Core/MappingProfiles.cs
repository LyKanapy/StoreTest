using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
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
            CreateMap<Product, ProductDto>()
                .ForMember(d=>d.CategoryId, o=>o.MapFrom(s => s.Category.CategoryId))
                .ForMember(d=>d.CategoryName, o=>o.MapFrom(s => s.Category.CategoryName));
        }
    }
}