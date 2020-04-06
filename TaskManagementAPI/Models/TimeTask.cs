using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Data.CustomValidations;

namespace TaskManagementAPI.Models
{
    public class TimeTask : BaseTask
    {
        [DateLessThan("EndDate", ErrorMessage = "Invalid Start or End Date")]
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
