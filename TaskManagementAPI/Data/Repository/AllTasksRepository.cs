using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Data.Repository.IRepository;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository
{
    public class AllTasksRepository : IAllTasksRepository
    {
        private readonly ApplicationDbContext _db;

        public AllTasksRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public ICollection<BaseTask> GetAllTasks()
        {
            List<BaseTask> baseList = new List<BaseTask>();
            var timeTasks = _db.TimeTask.ToList();
            var severityTasks = _db.SeverityTask.ToList();

            foreach (var timetask in timeTasks)
            {
                baseList.Add(timetask);
            }

            foreach (var severityTask in severityTasks)
            {
                baseList.Add(severityTask);
            }

            return baseList;
        }
    }
}
