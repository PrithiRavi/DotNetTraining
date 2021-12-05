using Microsoft.AspNetCore.Mvc;
using ProjectManagementBusiness;
using ProjectManagementBusiness.Models;


namespace API_dotNetTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectsRepository _repository;
        public ProjectController(IProjectsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _repository.GetAllProjects();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var data = _repository.GetProjectById(id);
            if (data == null)
                return NotFound("Project details not found...");
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post(Projects projects)
        {
            var projectIdExists = _repository.GetProjectById(projects.ID);
            if (projectIdExists != null)
                return BadRequest("Project ID already exists...");
            var projectNameExists = _repository.GetProjectByName(projects.Name);
            if (projectNameExists != null)
                return BadRequest("Project name already exists...");
            var createProject = _repository.AddProject(projects);
            if (createProject == null)
                return BadRequest("Something went wrong...Please try again!");
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host
                + HttpContext.Request.Path + "/" + projects.ID, projects);
        }

        [HttpPut]
        public IActionResult Put(Projects projects)
        {
            var projectExists = _repository.GetProjectById(projects.ID);
            if (projectExists == null)
                return BadRequest("Project ID not found!");
            if (projects.Name != projectExists.Name)
            {
                var projectNameExists = _repository.GetProjectByName(projects.Name);
                if (projectNameExists != null)
                    return BadRequest("Project name already exists...");
            }
            projectExists.Name = projects.Name;
            projectExists.Detail = projects.Detail;
            var updatedProject = _repository.UpdateProject(projectExists);
            if (updatedProject == null)
                return BadRequest("Something went wrong...Please try again!");
            return Ok(updatedProject);
        }
    }
}
