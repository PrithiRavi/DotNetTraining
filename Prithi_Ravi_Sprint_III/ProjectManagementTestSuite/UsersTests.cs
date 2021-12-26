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

namespace ProjectManagementTestSuite
{
    public class UsersTests : IClassFixture<PMClient>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        public UsersTests(PMClient factory)
        {
            _factory = factory;
        }

        [Theory]
        [Trait("Category", "GetsUsers")]
        [InlineData("/api/User/")]
        [InlineData("/api/User/1001")]
        public async Task GetsAllUsersAndUserById(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.OK, actualResult.StatusCode);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "GetsUsers")]
        [InlineData("/api/User/10001")]
        public async Task GetsUsersById_ReturnsNotFound_AsUserIdNotExist(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.NotFound, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "CreatesUser")]
        [InlineData("/api/User/")]
        public async Task CreatesUser_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 101, FirstName = "Xunit", LastName = "TestUser", Email = "xunit@test.com", Password = "XUnit@321" };
            var postContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.Created, actualResult.StatusCode);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "CreatesUser")]
        [InlineData("/api/User/")]
        public async Task CreatesUser_ReturnsBadRequest_AsUserIdAlreadyExists(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 1004, FirstName = "Bob", LastName = "Martin", Email = "bob.martin@test.com", Password = "Bob123" };
            var postContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "CreatesUser")]
        [InlineData("/api/User/")]
        public async Task CreatesUser_ReturnsBadRequest_AsEmailAlreadyExists(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 1013, FirstName = "Xunit", LastName = "TestUser", Email = "bob.martin@test.com", Password = "Bob123" };
            var postContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PostAsync(url, postContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UpdatesUser")]
        [InlineData("/api/User/")]
        public async Task UpdatesUser_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 1004, FirstName = "Bob", LastName = "Martin", Email = "bob.martin@test.com", Password = "Updated123" };
            var putContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, putContent);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.OK, actualResult.StatusCode);
            Assert.Equal("application/json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UpdatesUser")]
        [InlineData("/api/User/")]
        public async Task UpdatesUser_ReturnsBadRequest_AsUserIdNotFound(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 1102, FirstName = "Bob", LastName = "Martin", Email = "bob.martin@test.com", Password = "Updated123" };
            var putContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, putContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UpdatesUser")]
        [InlineData("/api/User/")]
        public async Task UpdatesUser_ReturnsBadRequest_AsEmailAlreadyExists(string url)
        {
            var testClient = _factory.CreateClient();
            Users users = new()
            { ID = 1004, FirstName = "Bob", LastName = "Martin", Email = "mark.seeman@test.com", Password = "Updated123" };
            var putContent = new StringContent(JsonConvert.SerializeObject(users), Encoding.UTF8, "application/json");
            var actualResult = await testClient.PutAsync(url, putContent);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UserLogin")]
        [InlineData("/api/User/userLogin?email=mark.seeman@test.com&password=Mark123")]
        public async Task UserLogin_ReturnsSuccess(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            actualResult.EnsureSuccessStatusCode();
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.OK, actualResult.StatusCode);
        }

        [Theory]
        [Trait("Category", "UserLogin")]
        [InlineData("/api/User/userLogin?email=invalid.email@test.com&password=Email123")]
        public async Task UserLogin_ReturnsBadRequest_AsEmailDoesntExists(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.BadRequest, actualResult.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [Trait("Category", "UserLogin")]
        [InlineData("/api/User/userLogin?email=mark.seeman@test.com&password=Incorrect123")]
        public async Task UserLogin_ReturnsBadRequest_AsPasswordIncorrect(string url)
        {
            var testClient = _factory.CreateClient();
            var actualResult = await testClient.GetAsync(url);
            Assert.NotNull(actualResult);
            Assert.Equal(HttpStatusCode.Unauthorized, actualResult.StatusCode);
            Assert.Equal("application/problem+json; charset=utf-8", actualResult.Content.Headers.ContentType.ToString());
        }
    }
}
