using Xunit;
using ProjectManagement;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using ProjectManagementBusiness.Models;
using System;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Net;

namespace ProjectManagementXUnitTestSuite
{
    public class TasksTests : IClassFixture<PMClient>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        public TasksTests(PMClient factory)
        {
            _factory = factory;
        }

        [Theory]
        [Trait("Category", "GetsTasks")]
        [InlineData("/api/Tasks")]
        [InlineData("/api/Tasks/1")]
        public async Task GetsTasksAndByTaskId(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "GetsTasks")]
        [InlineData("/api/Tasks/123")]
        public async Task GetsTasksById_ReturnsBadRequest_AsTaskIdIsNotPresent(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "GetsTasks")]
        [InlineData("/api/Tasks/")]
        public async Task CreateNewTask_Fails_ReturnsBadRequest_AsTaskIdAlreadyExists(string url)
        {
            var testClient = _factory.CreateClient();
            Tasks tasks = new()
            { ID = 1, ProjectID = 1, Status = 2, AssignedToUserID = 1, Detail = "This is a test task_1", CreatedOn = DateTime.Now };
            var postContent = new StringContent(JsonConvert.SerializeObject(tasks), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "CreatesTasks")]
        [InlineData("/api/Tasks/")]
        public async Task CreateNewTask_Fails_ReturnsBadRequest_AsProjectTaskExistsForUser(string url)
        {
            var testClient = _factory.CreateClient();
            Tasks tasks = new()
            { ID = 8, ProjectID = 2, Status = 3, AssignedToUserID = 1, Detail = "This is a test task_8", CreatedOn = DateTime.Now };
            var postContent = new StringContent(JsonConvert.SerializeObject(tasks), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "CreatesTasks")]
        [InlineData("/api/Tasks/")]
        public async Task CreateNewTask_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Tasks tasks = new()
            { ID = 2, ProjectID = 1, Status = 3, AssignedToUserID = 2, Detail = "This is a test task_2", CreatedOn = DateTime.Now };
            var postContent = new StringContent(JsonConvert.SerializeObject(tasks), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.Created, actualResult.StatusCode);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UpdatesTasks")]
        [InlineData("/api/Tasks")]
        public async Task UpdatesTask_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Tasks tasks = new()
            { ID = 4, ProjectID = 1, Status = 4, AssignedToUserID = 2, Detail = "Updating Task 4 details", CreatedOn = DateTime.Now };
            var putContent = new StringContent(JsonConvert.SerializeObject(tasks), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, putContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.OK, actualResult.StatusCode);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UpdatesTasks")]
        [InlineData("/api/Tasks")]
        public async Task UpdatesTask_ReturnsBadRequest_AsTaskIdNotFound(string url)
        {
            var testClient = _factory.CreateClient();
            Tasks tasks = new()
            { ID = 12, ProjectID = 1, Status = 4, AssignedToUserID = 3, Detail = "Updating Task 12 details", CreatedOn = DateTime.Now };
            var putContent = new StringContent(JsonConvert.SerializeObject(tasks), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, putContent);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }
    }
}
