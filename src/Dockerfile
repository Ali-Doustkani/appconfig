FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY app.csproj .
RUN dotnet restore 
COPY . .
RUN dotnet publish --output /app --configuration Release

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENTRYPOINT ["dotnet", "app.dll"]