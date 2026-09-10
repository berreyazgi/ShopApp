using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using ShopApp.Application.Mapping;

namespace ShopApp.Application.Tests.TestSupport;

public static class MapperFactory
{
    public static IMapper Create()
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddAutoMapper(cfg =>
        {
            cfg.AddProfile<SepetMapping>();
            cfg.AddProfile<SiparisMapping>();
            cfg.AddProfile<UrunMapping>();
        });
        return services.BuildServiceProvider().GetRequiredService<IMapper>();
    }
}
