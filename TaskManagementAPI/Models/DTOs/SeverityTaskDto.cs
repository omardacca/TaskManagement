using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagementAPI.Models.DTOs
{
    public class SeverityTaskDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Description { get; set; }

        public enum SeverityType { Low, Medium, High, Red }

        [Required]
        public SeverityType Severity { get; set; }
    }
}
