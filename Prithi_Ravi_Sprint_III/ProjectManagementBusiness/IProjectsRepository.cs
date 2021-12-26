using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementBusiness
{
    public interface IProjectsRepository
    {
        List<Projects> GetAllProjects();
        Projects GetProjectById(int id);
        Projects GetProjectByName(string projectName);
        Projects AddProject(Projects project);
        Projects UpdateProject(Projects project);
    }
}
