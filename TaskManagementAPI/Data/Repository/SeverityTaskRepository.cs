using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Data.Repository.IRepository;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository
{
    public class SeverityTaskRepository : ISeverityTaskRepository
    {
        private readonly ApplicationDbContext _db;

        public SeverityTaskRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreatSeverityTask(SeverityTask severityTask)
        {
            _db.SeverityTask.Add(severityTask);
            return Save();
        }

        public bool DeleteSeverityTask(SeverityTask severityTask)
        {
            _db.SeverityTask.Remove(severityTask);
            return Save();
        }

        public SeverityTask GetSeverityTask(int severityTaskId)
        {
            return _db.SeverityTask.FirstOrDefault(t => t.Id == severityTaskId);
        }

        public ICollection<SeverityTask> GetSeverityTasks()
        {
            return _db.SeverityTask.ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool SeverityTaskExists(string title)
        {
            bool value = _db.SeverityTask.Any(t => t.Title.ToLower().Trim() == title.ToLower().Trim());
            return value;
        }

        public bool SeverityTaskExists(int id)
        {
            return _db.SeverityTask.Any(t => t.Id == id);
        }

        public bool UpdateSeverityTask(SeverityTask severityTask)
        {
            _db.SeverityTask.Update(severityTask);
            return Save();
        }
    }
}
