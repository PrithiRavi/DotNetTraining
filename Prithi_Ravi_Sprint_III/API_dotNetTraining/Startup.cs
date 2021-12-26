using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ProjectManagementRepository;
using ProjectManagementBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectManagementBusiness.Models;

namespace ProjectManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Random random = new();
            var dbName = "dotNetTraining" + random.Next().ToString();
            services.AddDbContext<AppDBContext>(context => { context.UseInMemoryDatabase(dbName); });
            services.AddScoped<IUserRepository, UserImplementation>();
            services.AddScoped<IProjectsRepository, ProjectsImplementation>();
            services.AddScoped<ITasksRepository, TasksImplementation>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotNetTraining", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
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
            if (!context.Users.Any() && !context.Projects.Any() && !context.Tasks.Any())
                InitialSeedData(context);
        }

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
    }
}
