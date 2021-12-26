using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementBusiness
{
    public interface ITasksRepository
    {
        Tasks AddTask(Tasks tasks);
        Tasks UpdateTask(Tasks tasks);
        List<Tasks> GetAllTasks();
        Tasks GetTaskById(int id);
        Tasks GetTasksByUserProject(int userId, int projectId);
    }
}
