using App.Application.Interfaces;
using App.Domain.Entities.HR;

namespace App.Application.Services;

public class AttendanceService
{
    private readonly IAttendanceRepository _repository;

    public AttendanceService(IAttendanceRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Attendance>> GetAllAsync() => await _repository.GetAllAsync();

    public async Task<Attendance?> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

    public async Task AddAsync(Attendance attendance) => await _repository.AddAsync(attendance);

    public async Task UpdateAsync(Attendance attendance) => await _repository.UpdateAsync(attendance);

    public async Task DeleteAsync(Guid id) => await _repository.DeleteAsync(id);

    public async Task<object> GetAttendanceSummary(Guid staffId)
    {
        var today = DateTime.UtcNow.Date;
        var attendances = await _repository.GetByStaffIdAsync(staffId);

        return new
        {
            Daily = attendances.Count(a => a.Date.Date == today && a.IsPresent),
            Weekly = attendances.Count(a => a.Date >= today.AddDays(-7) && a.IsPresent),
            Monthly = attendances.Count(a => a.Date >= new DateTime(today.Year, today.Month, 1) && a.IsPresent)
        };
    }
}
