using Microsoft.AspNetCore.Mvc;
using API_dotNetTraining.Models;

namespace API_dotNetTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        List<Tasks> TasksList = new List<Tasks>
        {
            new Tasks{ID=1, ProjectID=1, Status=2, AssignedToUserID=1, Detail="This is a test task_1", CreatedOn=DateTime.Now},
            new Tasks{ID=2, ProjectID=1, Status=3, AssignedToUserID=2, Detail="This is a test task_2", CreatedOn=DateTime.Now},
            new Tasks{ID=3, ProjectID=2, Status=1, AssignedToUserID=2, Detail="This is a test task_3", CreatedOn=DateTime.Now},
            new Tasks{ID=4, ProjectID=4, Status=4, AssignedToUserID=3, Detail="This is a test task_4", CreatedOn=DateTime.Now},
        };

        [HttpPost]
        public ActionResult<Tasks> CreateTask(Tasks task)
        {
            if (task.ID == 0 || task.ProjectID == 0 || task.Status == 0 || task.AssignedToUserID == 0 || task.Detail == null)
            {
                return BadRequest();
            }

            var existingTask = TasksList.FirstOrDefault(t => t.ID == task.ID);
            if (existingTask != null)
            {
                return StatusCode(409, "TaskID already exists.");
            }
            TasksList.Add(task);
            return Ok();
        }

        [HttpPut]
        public ActionResult<Tasks> UpdateTask(Tasks task)
        {
            var updatedTask = TasksList.FirstOrDefault(t => t.ID == task.ID);
            if (updatedTask == null)
            {
                return NotFound();
            }
            updatedTask.ProjectID = task.ProjectID;
            updatedTask.Status = task.Status;
            updatedTask.AssignedToUserID = task.AssignedToUserID;
            updatedTask.Detail = task.Detail;

            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Tasks> GetTaskById(int id)
        {
            var requestedTask = TasksList.FirstOrDefault(t => t.ID == id);
            if (requestedTask == null)
            {
                return NoContent();
            }
            return requestedTask;
        }

        [HttpGet]
        public List<Tasks> GetAllTasks()
        {
            return TasksList;
        }
    }
}
