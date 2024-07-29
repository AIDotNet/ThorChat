using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ThorChat.Service.Utils;

/// <summary>
/// Jwt解析器
/// </summary>
public static class JwtParser
{
    public static T? ParseJwt<T>(string token) where T : class
    {
        try
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return null;
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken == null)
            {
                throw new ArgumentException("Invalid JWT token");
            }

            var claims = jsonToken.Claims;
            var json = "{";

            foreach (var claim in claims)
            {
                json += $"\"{claim.Type}\": \"{claim.Value}\",";
            }

            json = json.TrimEnd(',') + "}";

            return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions()
            {
                // 支持字符串转int
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            });
        }
        catch (Exception e)
        {
            return null;
        }
    }
}