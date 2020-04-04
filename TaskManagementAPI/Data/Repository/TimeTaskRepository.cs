using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.Data.Repository.IRepository;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Data.Repository
{
    public class TimeTaskRepository : ITimeTaskRepository
    {
        private readonly ApplicationDbContext _db;

        public TimeTaskRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreatTimeTask(TimeTask timeTask)
        {
            _db.TimeTask.Add(timeTask);
            return Save();
        }

        public bool DeleteTimeTask(TimeTask timeTask)
        {
            _db.TimeTask.Remove(timeTask);
            return Save();
        }

        public TimeTask GetTimeTask(int timeTaskId)
        {
            return _db.TimeTask.FirstOrDefault(t => t.Id == timeTaskId);
        }

        public ICollection<TimeTask> GetTimeTasks()
        {
            return _db.TimeTask.OrderBy(t => t.StartDate).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool TimeTaskExists(string title)
        {
            bool value = _db.TimeTask.Any(t => t.Title.ToLower().Trim() == title.ToLower().Trim());
            return value;
        }

        public bool TimeTaskExists(int id)
        {
            return _db.TimeTask.Any(t => t.Id == id);
        }

        public bool UpdateTimeTask(TimeTask timeTask)
        {
            _db.TimeTask.Update(timeTask);
            return Save();
        }
    }
}
