using AutoMapper;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Mapping;

public class UrunMapping : Profile
{
    public UrunMapping()
    {
        CreateMap<Kategori, ResultKategoriDto>().ReverseMap();
        CreateMap<Urun, ResultUrunDto>()
            .ForCtorParam(nameof(ResultUrunDto.Gorseller), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).ToList()))
            .ForCtorParam(nameof(ResultUrunDto.ImageUrls), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).Select(g => g.GorselUrl).ToList()));
        CreateMap<ResultUrunDto, Urun>();
        CreateMap<UrunGorsel, ResultUrunGorselDto>().ReverseMap();
        CreateMap<UrunVaryant, ResultUrunVaryantDto>().ReverseMap();
        CreateMap<UrunOzellik, ResultUrunOzellikDto>().ReverseMap();

        CreateMap<Kategori, GetByIdKategoriDto>();
        CreateMap<Urun, GetByIdUrunDto>()
            .ForCtorParam(nameof(GetByIdUrunDto.KategoriAd), opt => opt.MapFrom(src => src.Kategori.KategoriAd))
            .ForCtorParam(nameof(GetByIdUrunDto.Gorseller), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).ToList()))
            .ForCtorParam(nameof(GetByIdUrunDto.Ozellikler), opt => opt.MapFrom(src => src.Ozellikler.OrderBy(o => o.Siralama).ToList()))
            .ForCtorParam(nameof(GetByIdUrunDto.Varyantlar), opt => opt.MapFrom(src => src.Varyantlar.ToList()))
            .ForCtorParam(nameof(GetByIdUrunDto.ImageUrls), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).Select(g => g.GorselUrl).ToList()));
        CreateMap<UrunGorsel, GetByIdUrunGorselDto>();
        CreateMap<UrunOzellik, GetByIdUrunOzellikDto>();

        CreateMap<Urun, ProductDto>()
            .ForCtorParam(nameof(ProductDto.Name), opt => opt.MapFrom(src => src.UrunAd))
            .ForCtorParam(nameof(ProductDto.CategoryId), opt => opt.MapFrom(src => src.KategoriId))
            .ForCtorParam(nameof(ProductDto.Description), opt => opt.MapFrom(src => src.Detay))
            .ForCtorParam(nameof(ProductDto.Price), opt => opt.MapFrom(src => src.Fiyat))
            .ForCtorParam(nameof(ProductDto.Brand), opt => opt.MapFrom(src => src.MarkaAd))
            .ForCtorParam(nameof(ProductDto.PreviousPrice), opt => opt.MapFrom(src => src.GecmisFiyat))
            .ForCtorParam(nameof(ProductDto.CoverImageUrl), opt => opt.MapFrom(src => src.GorselUrl))
            .ForCtorParam(nameof(ProductDto.IsActive), opt => opt.MapFrom(src => src.AktifMi))
            .ForCtorParam(nameof(ProductDto.ImageUrls), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).Select(g => g.GorselUrl).ToList()))
            .ForCtorParam(nameof(ProductDto.Images), opt => opt.MapFrom(src => src.Gorseller.OrderBy(g => g.GorselSira).ToList()));

        CreateMap<UrunGorsel, ProductImageDto>()
            .ForCtorParam(nameof(ProductImageDto.ProductId), opt => opt.MapFrom(src => src.UrunId))
            .ForCtorParam(nameof(ProductImageDto.ImageUrl), opt => opt.MapFrom(src => src.GorselUrl))
            .ForCtorParam(nameof(ProductImageDto.DisplayOrder), opt => opt.MapFrom(src => src.GorselSira))
            .ForCtorParam(nameof(ProductImageDto.IsMain), opt => opt.MapFrom(src => src.AnaGorselMi));
    }
}
