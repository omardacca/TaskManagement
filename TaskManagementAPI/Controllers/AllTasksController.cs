using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data.Repository.IRepository;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.DTOs;

namespace TaskManagementAPI.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [EnableCors("AllowOrigin")]
    public class AllTasksController : ControllerBase
    {
        private IAllTasksRepository _allTasksRepo;
        private readonly IMapper _mapper;

        public AllTasksController(IAllTasksRepository allTasksRepo, IMapper mapper)
        {
            _allTasksRepo = allTasksRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<AllTasksDto>))]
        public IActionResult GetTimeTasks()
        {
            var tasks = _allTasksRepo.GetAllTasks();

            var tasksDtoList = new List<AllTasksDto>();

            foreach (var obj in tasks)
            {
                tasksDtoList.Add(_mapper.Map<AllTasksDto>(obj));
            }

            return Ok(tasksDtoList);
        }
    }
}