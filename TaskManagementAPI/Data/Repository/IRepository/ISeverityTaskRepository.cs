using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository.IRepository
{
    public interface ISeverityTaskRepository
    {
        ICollection<SeverityTask> GetSeverityTasks();
        SeverityTask GetSeverityTask(int severityTaskId);
        bool SeverityTaskExists(string title);
        bool SeverityTaskExists(int id);
        bool CreatSeverityTask(SeverityTask severityTask);
        bool UpdateSeverityTask(SeverityTask severityTask);
        bool DeleteSeverityTask(SeverityTask severityTask);
        bool Save();
    }
}
