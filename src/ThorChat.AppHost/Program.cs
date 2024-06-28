var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.ThorChat_Service>("thorchat-service");

builder.Build().Run();
