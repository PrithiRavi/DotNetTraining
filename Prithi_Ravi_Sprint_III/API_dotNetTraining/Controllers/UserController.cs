using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementBusiness;
using ProjectManagementBusiness.Models;

namespace ProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _repository;
        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _repository.GetAllUsers();
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post(Users user)
        {
            var existingUser = _repository.GetUserById(user.ID);
            if (existingUser != null)
                return BadRequest("User ID already exists!");
            var emailUsed = _repository.GetUserByEmail(user.Email);
            if (emailUsed != null)
                return BadRequest("Email address already exists.");
            var data = _repository.AddUser(user);
            if (data == null)
                return BadRequest("Something went wrong. Please try again!");
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host
                + HttpContext.Request.Path + "/" + user.ID, user);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetUserById(id);
            if (data == null)
                return NotFound("User not found.");
            return Ok(data);
        }

        [HttpPut]
        public IActionResult Put(Users user)
        {
            var userExists = _repository.GetUserById(user.ID);
            if (userExists == null)
                return BadRequest("User ID not found!");
            if (user.Email != userExists.Email)
            {
                var emailUsed = _repository.GetUserByEmail(user.Email);
                if (emailUsed != null)
                    return BadRequest("Email address already exists.");
            }
            userExists.Email = user.Email;
            userExists.FirstName = user.FirstName;
            userExists.LastName = user.LastName;
            var data = _repository.UpdateUser(userExists);
            if (data == null)
                return BadRequest("Something went wrong. Please try again!");
            return Ok(data);
        }

        [HttpGet("userLogin")]
        public IActionResult UserLogin(string email, string password)
        {
            var userExists = _repository.GetUserByEmail(email);
            if (userExists == null)
                return BadRequest("User not registered!");
            if (userExists.Password != password)
                return Unauthorized();
            return Ok();
        }

    }
}
