using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository.IRepository
{
    public interface ITimeTaskRepository
    {
        ICollection<TimeTask> GetTimeTasks();
        TimeTask GetTimeTask(int timeTaskId);
        bool TimeTaskExists(string title);
        bool TimeTaskExists(int id);
        bool CreatTimeTask(TimeTask timeTask);
        bool UpdateTimeTask(TimeTask timeTask);
        bool DeleteTimeTask(TimeTask timeTask);
        bool Save();
    }
}
