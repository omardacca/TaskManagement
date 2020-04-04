using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.DTOs;

namespace TaskManagementAPI.Mappers
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<TimeTask, TimeTaskDto>().ReverseMap();
            CreateMap<SeverityTask, SeverityTaskDto>().ReverseMap();
        } 
    }
}
