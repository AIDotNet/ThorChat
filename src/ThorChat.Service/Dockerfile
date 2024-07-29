FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM node as builder
WORKDIR /src
COPY web .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/ThorChat.Service/ThorChat.Service.csproj", "src/ThorChat.Service/"]
RUN dotnet restore "src/ThorChat.Service/ThorChat.Service.csproj"
COPY . .
WORKDIR "/src/src/ThorChat.Service"
RUN dotnet build "ThorChat.Service.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ThorChat.Service.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=builder /src/dist ./wwwroot
ENTRYPOINT ["dotnet", "ThorChat.Service.dll"]
