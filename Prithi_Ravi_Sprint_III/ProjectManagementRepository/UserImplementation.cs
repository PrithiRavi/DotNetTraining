using ProjectManagementBusiness;
using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementRepository
{
    public class UserImplementation : IUserRepository
    {
        private readonly AppDBContext _context;
        public UserImplementation(AppDBContext context)
        {
            _context = context;
        }

        public Users AddUser(Users user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public List<Users> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public Users GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public Users GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.ID == id);
        }

        public Users UpdateUser(Users user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
            return user;
        }
    }
}
