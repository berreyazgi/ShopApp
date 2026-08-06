# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base

WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000


FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["src/Monolith/ShopApp.Api/ShopApp.Api.csproj", "src/Monolith/ShopApp.Api/"]
COPY ["src/Monolith/ShopApp.Application/ShopApp.Application.csproj", "src/Monolith/ShopApp.Application/"]
COPY ["src/Monolith/ShopApp.Domain/ShopApp.Domain.csproj", "src/Monolith/ShopApp.Domain/"]
COPY ["src/Monolith/ShopApp.Infrastructure/ShopApp.Infrastructure.csproj", "src/Monolith/ShopApp.Infrastructure/"]

RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet restore "src/Monolith/ShopApp.Api/ShopApp.Api.csproj"

COPY . .

WORKDIR "/src/src/Monolith/ShopApp.Api"

RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet publish "ShopApp.Api.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ShopApp.Api.dll"]