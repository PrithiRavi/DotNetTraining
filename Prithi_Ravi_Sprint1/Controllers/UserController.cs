using Microsoft.AspNetCore.Mvc;
using API_dotNetTraining.Models;

namespace API_dotNetTraining.Controllers
{
    public class UserController : Controller
    {
        List<Users> userList = new List<Users>
        {
            new Users{ID=1, FirstName="John", LastName="Doe", Email="john.doe@test.com", Password="Password1"},
            new Users{ID=2, FirstName="John", LastName="Skeet", Email="john.skeet@test.com", Password="Password1"},
            new Users{ID=3, FirstName="Mark", LastName="Seeman", Email="mark.seeman@tes.com", Password="Password1"},
            new Users{ID=4, FirstName="Bob", LastName="Martin", Email="bob.martin@tes.com", Password="Password1"},

        };

        [HttpPost]
        public ActionResult<Users> CreateUser(Users user)
        {
            if (user.ID == 0 || user.FirstName == null || user.LastName == null || user.Email == null || user.Password == null)
            {
                return BadRequest();
            }
            var userExists = userList.FirstOrDefault(p => p.ID == user.ID);
            if (userExists != null)
            {
                return StatusCode(409, "UserID already exists");
            }
            userList.Add(user);
            return Ok();
        }

        [HttpGet]
        public List<Users> GetAllUsers()
        {
            return userList;
        }

        [Route("{id}")]
        [HttpGet]
        public ActionResult<Users> GetUserByID(int id)
        {
            var requestedUser = userList.FirstOrDefault(u => u.ID == id);
            if (requestedUser == null)
            {
                return NoContent();
            }
            return requestedUser;
        }

        [HttpPut]
        public ActionResult<Users> UpdateUser(Users user)
        {
            var updatedObj = userList.FirstOrDefault(u => u.ID == user.ID);

            if (updatedObj == null)
            {
                return NotFound();
            }
            updatedObj.FirstName = user.FirstName;
            updatedObj.LastName = user.LastName;
            updatedObj.Email = user.Email;
            updatedObj.Password = user.Password;

            return updatedObj;
        }

        [HttpPost]
        [Route("userLogin")]
        public ActionResult<Users> UserLogin(Users user)
        {
            var userDetails = userList.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
            if (userDetails == null)
            {
                return Unauthorized();
            }
            return Ok();
        }


    }
}
