using System.Text.Json.Serialization;

namespace ThorChat.Service.Model;

public class ChatTextToImageResult
{
    [JsonPropertyName("data")]
    public Data[] Data { get; set; }
    
    [JsonPropertyName("created")]
    public int Created { get; set; }
    
    [JsonPropertyName("successful")]
    public bool Successful { get; set; }
}

public class Data
{
    [JsonPropertyName("url")]
    public string Url { get; set; }
    
    [JsonPropertyName("revised_prompt")]
    public string RevisedPrompt { get; set; }
}

