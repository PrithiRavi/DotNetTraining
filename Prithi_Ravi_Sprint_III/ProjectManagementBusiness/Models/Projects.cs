using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagementBusiness.Models
{
    public class Projects
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
