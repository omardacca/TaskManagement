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
    [Route("api/timetask")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class TimeTaskController : ControllerBase
    {
        private ITimeTaskRepository _timeTaskRepo;
        private readonly IMapper _mapper;

        public TimeTaskController(ITimeTaskRepository timetaskRepo, IMapper mapper)
        {
            _timeTaskRepo = timetaskRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<TimeTaskDto>))]
        public IActionResult GetTimeTasks()
        {
            var timetasksList = _timeTaskRepo.GetTimeTasks();

            var timetaskDtoList = new List<TimeTaskDto>();

            foreach (var obj in timetasksList)
            {
                timetaskDtoList.Add(_mapper.Map<TimeTaskDto>(obj));
            }

            return Ok(timetaskDtoList);
        }

        [HttpGet("{timeTaskId:int}", Name = "GetTimeTask")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TimeTaskDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public IActionResult GetTimeTask(int timeTaskId)
        {
            var obj = _timeTaskRepo.GetTimeTask(timeTaskId);
            if(obj == null)
            {
                return NotFound();
            }

            var objDto = _mapper.Map<TimeTaskDto>(obj);
            return Ok(objDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(TimeTaskDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CreateTimeTask([FromBody] TimeTaskDto timeTaskDto)
        {
            if(timeTaskDto == null)
            {
                return BadRequest(ModelState);
            }

            //if(_timeTaskRepo.TimeTaskExists(timeTaskDto.Title))
            //{
            //    ModelState.AddModelError("", "Time task exists!");
            //    return StatusCode(404, ModelState);
            //}

            var timeTaskObj = _mapper.Map<TimeTask>(timeTaskDto);

            if(!_timeTaskRepo.CreatTimeTask(timeTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while saving time task {timeTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetTimeTask", new { timeTaskId = timeTaskObj.Id }, timeTaskObj);
        }

        [HttpPatch("{timetaskId:int}", Name = "UpdateTimeTask")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateTimeTask(int timetaskId, [FromBody] TimeTaskDto timeTaskDto)
        {
            if (timeTaskDto == null || timetaskId != timeTaskDto.Id)
            {
                return BadRequest(ModelState);
            }

            var timeTaskObj = _mapper.Map<TimeTask>(timeTaskDto);

            if (!_timeTaskRepo.UpdateTimeTask(timeTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while updating time task {timeTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{timetaskId:int}", Name = "DeleteTimeTask")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteTimeTask(int timetaskId)
        {
            if (!_timeTaskRepo.TimeTaskExists(timetaskId))
            {
                return NotFound();
            }

            var timeTaskObj = _timeTaskRepo.GetTimeTask(timetaskId);
            if (!_timeTaskRepo.DeleteTimeTask(timeTaskObj))
            {
                ModelState.AddModelError("", $"Something went wrong while deleting time task {timeTaskObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}