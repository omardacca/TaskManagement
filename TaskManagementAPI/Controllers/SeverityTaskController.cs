using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data.Repository.IRepository;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.DTOs;

namespace TaskManagementAPI.Controllers
{
    [Route("api/severitytask")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class SeverityTaskController : ControllerBase
    {
        private ISeverityTaskRepository _severityTaskRepo;
        private readonly IMapper _mapper;

        public SeverityTaskController(ISeverityTaskRepository severityTaskRepo, IMapper mapper)
        {
            _severityTaskRepo = severityTaskRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SeverityTaskDto>))]
        public IActionResult GetSeverityTasks()
        {
            var severityTasksList = _severityTaskRepo.GetSeverityTasks();

            var severityTaskDtoList = new List<SeverityTaskDto>();

            foreach (var obj in severityTasksList)
            {
                severityTaskDtoList.Add(_mapper.Map<SeverityTaskDto>(obj));
            }

            return Ok(severityTaskDtoList);
        }

        [HttpGet("{severityTaskId:int}", Name = "GetSeverityTask")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SeverityTaskDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public IActionResult GetSeverityTask(int severityTaskId)
        {
            var obj = _severityTaskRepo.GetSeverityTask(severityTaskId);
            if(obj == null)
            {
                return NotFound();
            }

            var objDto = _mapper.Map<SeverityTaskDto>(obj);
            return Ok(objDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(SeverityTaskDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CreateSeverityTask([FromBody] SeverityTaskDto severityTaskDto)
        {
            if(severityTaskDto == null)
            {
                return BadRequest(ModelState);
            }

            var severityTaskObj = _mapper.Map<SeverityTask>(severityTaskDto);

            if(!_severityTaskRepo.CreatSeverityTask(severityTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while saving severity task {severityTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetSeverityTask", new { severityTaskId = severityTaskObj.Id }, severityTaskObj);
        }

        [HttpPatch("{severityTaskId:int}", Name = "UpdateSeverityTask")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateSeverityTask(int severityTaskId, [FromBody] SeverityTaskDto severityTaskDto)
        {
            if (severityTaskDto == null || severityTaskId != severityTaskDto.Id)
            {
                return BadRequest(ModelState);
            }

            var severityTaskObj = _mapper.Map<SeverityTask>(severityTaskDto);

            if (!_severityTaskRepo.UpdateSeverityTask(severityTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while updating severity task {severityTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{severityTaskId:int}", Name = "DeleteSeverityTask")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteSeverityTask(int severityTaskId)
        {
            if (!_severityTaskRepo.SeverityTaskExists(severityTaskId))
            {
                return NotFound();
            }

            var severityTaskObj = _severityTaskRepo.GetSeverityTask(severityTaskId);
            if (!_severityTaskRepo.DeleteSeverityTask(severityTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while deleting severity task {severityTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}