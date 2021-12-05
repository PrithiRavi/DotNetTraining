using Microsoft.OpenApi.Models;
using ProjectManagementRepository;
using ProjectManagementBusiness;
using Microsoft.EntityFrameworkCore;
using ProjectManagementBusiness.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDBContext>(context => { context.UseInMemoryDatabase("dotNetTraining"); });
builder.Services.AddScoped<IUserRepository, UserImplementation>();
builder.Services.AddScoped<IProjectsRepository, ProjectsImplementation>();
builder.Services.AddScoped<ITasksRepository, TasksImplementation>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagDoc =>
{
    swagDoc.SwaggerDoc("v1", new OpenApiInfo { Title = "dotNetTraining", Version = "v1" });
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "dotNetTraining v1"));
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
var scope = app.ApplicationServices.CreateScope();
var context = scope.ServiceProvider.GetService<AppDBContext>();
InitialSeedData(context);

 static void InitialSeedData(AppDBContext context)
{
    //Initial Data for Users
    context.Users.Add(new Users { ID = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@test.com", Password = "Password1" });
    context.Users.Add(new Users { ID = 2, FirstName = "John", LastName = "Skeet", Email = "john.skeet@test.com", Password = "Password1" });
    context.Users.Add(new Users { ID = 3, FirstName = "Mark", LastName = "Seeman", Email = "mark.seeman@tes.com", Password = "Password1" });
    context.Users.Add(new Users { ID = 4, FirstName = "Bob", LastName = "Martin", Email = "bob.martin@tes.com", Password = "Password1" });
   
    //Initial Data for Projects
    context.Projects.Add(new Projects { ID = 1, Name = "TestProject_1", Detail = "This is a test Project_1", CreatedOn = DateTime.Now });
    context.Projects.Add(new Projects { ID = 2, Name = "TestProject_2", Detail = "This is a test Project_2", CreatedOn = DateTime.Now });
    context.Projects.Add(new Projects { ID = 3, Name = "TestProject_3", Detail = "This is a test Project_3", CreatedOn = DateTime.Now });

    //Initial Data for Tasks
    context.Tasks.Add(new Tasks { ID = 1, ProjectID = 1, Status = 2, AssignedToUserID = 1, Detail = "This is a test task_1", CreatedOn = DateTime.Now });
    context.Tasks.Add(new Tasks { ID = 2, ProjectID = 1, Status = 3, AssignedToUserID = 2, Detail = "This is a test task_2", CreatedOn = DateTime.Now });
    context.Tasks.Add(new Tasks { ID = 3, ProjectID = 2, Status = 1, AssignedToUserID = 2, Detail = "This is a test task_3", CreatedOn = DateTime.Now });
    context.Tasks.Add(new Tasks { ID = 4, ProjectID = 4, Status = 4, AssignedToUserID = 3, Detail = "This is a test task_4", CreatedOn = DateTime.Now });
    
    context.SaveChanges();
}
