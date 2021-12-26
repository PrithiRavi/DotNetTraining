using ProjectManagementBusiness;
using ProjectManagementBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementRepository
{
    public class ProjectsImplementation : IProjectsRepository
    {
        private readonly AppDBContext _context;
        public ProjectsImplementation(AppDBContext context)
        {
            _context = context;
        }

        public Projects AddProject(Projects project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();
            return project;
        }

        public Projects UpdateProject(Projects project)
        {
            _context.Projects.Update(project);
            _context.SaveChanges();
            return project;
        }

        public List<Projects> GetAllProjects()
        {
            return _context.Projects.ToList();
        }

        public Projects GetProjectById(int id)
        {
            return _context.Projects.FirstOrDefault(p => p.ID == id);
        }

        public Projects GetProjectByName(string projectName)
        {
            return _context.Projects.FirstOrDefault(p => p.Name == projectName);
        }
    }
}
