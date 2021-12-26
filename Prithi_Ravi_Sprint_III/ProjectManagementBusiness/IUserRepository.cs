using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementBusiness
{
    public interface IUserRepository
    {
        List<Users> GetAllUsers();
        Users GetUserById(int id);
        Users GetUserByEmail(string email);
        Users AddUser(Users user);
        Users UpdateUser(Users user);
    }
}
