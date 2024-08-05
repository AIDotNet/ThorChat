using System.Text.Json.Serialization;

namespace ThorChat.Service.Model;

public sealed class ChatCompletionInput
{
    [JsonPropertyName("model")]
    public string Model { get; set; }
}