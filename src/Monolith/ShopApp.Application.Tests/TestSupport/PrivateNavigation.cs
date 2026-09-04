using System.Reflection;

namespace ShopApp.Application.Tests.TestSupport;

public static class PrivateNavigation
{
    public static void Set<T>(T target, string propertyName, object value)
    {
        var property = typeof(T).GetProperty(propertyName, BindingFlags.Public | BindingFlags.Instance)
            ?? throw new InvalidOperationException($"Property '{propertyName}' not found on {typeof(T).Name}.");
        property.SetValue(target, value);
    }
}
