using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository.IRepository
{
    public interface IAllTasksRepository
    {
        ICollection<BaseTask> GetAllTasks();
    }
}
