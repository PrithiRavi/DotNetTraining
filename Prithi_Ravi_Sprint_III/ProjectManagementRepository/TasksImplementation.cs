using ProjectManagementBusiness;
using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementRepository
{
    public class TasksImplementation : ITasksRepository
    {
        private readonly AppDBContext _context;
        public TasksImplementation(AppDBContext context)
        {
            _context = context;
        }
        public Tasks AddTask(Tasks tasks)
        {
            _context.Tasks.Add(tasks);
            _context.SaveChanges();
            return tasks;
        }

        public List<Tasks> GetAllTasks()
        {
            return _context.Tasks.ToList();
        }

        public Tasks GetTaskById(int id)
        {
            return _context.Tasks.FirstOrDefault(t => t.ID == id);
        }

        public Tasks GetTasksByUserProject(int userId, int projectId)
        {
            return _context.Tasks.FirstOrDefault(t => t.AssignedToUserID == userId && t.ProjectID == projectId);
        }

        public Tasks UpdateTask(Tasks tasks)
        {
            _context.Tasks.Update(tasks);
            _context.SaveChanges();
            return tasks;
        }
    }
}
