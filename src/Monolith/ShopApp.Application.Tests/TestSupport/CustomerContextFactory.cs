using Moq;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Tests.TestSupport;

public static class CustomerContextFactory
{
    public static Mock<ICurrentCustomerContext> For(CurrentCustomer customer)
    {
        var mock = new Mock<ICurrentCustomerContext>();
        mock.Setup(x => x.GetRequiredAsync(It.IsAny<CancellationToken>())).ReturnsAsync(customer);
        return mock;
    }
}
