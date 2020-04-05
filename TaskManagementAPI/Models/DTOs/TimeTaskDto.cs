using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Data.CustomValidations;

namespace TaskManagementAPI.Models.DTOs
{
    public class TimeTaskDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [DateLessThan("EndDate", ErrorMessage = "Invalid Start or End Date")]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
