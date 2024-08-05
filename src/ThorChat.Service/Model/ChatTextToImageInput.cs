namespace ThorChat.Service.Model;

public class ChatTextToImageInput
{
    public string prompt { get; set; }
    public string quality { get; set; }
    public string size { get; set; }
    public string style { get; set; }
    public string model { get; set; }
    public int n { get; set; }
}