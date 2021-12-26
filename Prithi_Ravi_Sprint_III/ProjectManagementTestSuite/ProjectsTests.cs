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
    public class ProjectTests : IClassFixture<PMClient>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        public ProjectTests(PMClient factory)
        {
            _factory = factory;
        }

        [Theory]
        [Trait("Category", "GetsProjects")]
        [InlineData("/api/projects")]
        [InlineData("/api/projects/1")]
        public async Task GetsAllPojectsAndById(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "GetsProjects")]
        [InlineData("/api/projects/200")]
        public async Task GetsProjects_Retruns404(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.Equal(HttpStatusCode.NotFound, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "CreatesProjects")]
        [InlineData("/api/projects")]
        public async Task CreateNewProject_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Projects projects = new()
            {
                ID = 100,
                Name = "Test Project",
                Detail = "Test project details",
                CreatedOn = DateTime.Now
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(projects), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.Created, actualResult.StatusCode);
        }


        [Theory]
        [Trait("Category", "CreatesProjects")]
        [InlineData("/api/projects")]
        public async Task CreateNewProject_ReturnsBadRequestAsProjectIdExists(string url)
        {
            var testClient = _factory.CreateClient();
            Projects projects = new()
            {
                ID = 1,
                Name = "Test Project",
                Detail = "Test project details",
                CreatedOn = DateTime.Now
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(projects), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "UpdatesProjects")]
        [InlineData("/api/projects")]
        public async Task UpdateProjectInfoAnd_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Projects projects = new()
            { ID = 3, Name = "TestProject_3", Detail = "Updating the project Details for project 3", CreatedOn = DateTime.Now };
            var updateContent = new StringContent(JsonConvert.SerializeObject(projects), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, updateContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.OK, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "UpdatesProjects")]
        [InlineData("/api/projects")]
        public async Task UpdateProjectInfoAnd_ReturnsBadRequestAsProjectIdNotFound(string url)
        {
            var testClient = _factory.CreateClient();
            Projects projects = new()
            { ID = 200, Name = "TestProject_200", Detail = "Details for project 200", CreatedOn = DateTime.Now };
            var updateContent = new StringContent(JsonConvert.SerializeObject(projects), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, updateContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "UpdatesProjects")]
        [InlineData("/api/projects")]
        public async Task UpdateProjectNameAnd_ReturnsBadRequestAsProjectNameAlreadyExists(string url)
        {
            var testClient = _factory.CreateClient();
            Projects projects = new()
            { ID = 3, Name = "TestProject_3", Detail = "Updating the project Details for project 3", CreatedOn = DateTime.Now };
            var updateContent = new StringContent(JsonConvert.SerializeObject(projects), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, updateContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
        }
    }
}
