using App.Domain.Entities.HR;

namespace App.Application.Interfaces;

public interface IAttendanceRepository
{
    Task<List<Attendance>> GetAllAsync();
    Task<Attendance?> GetByIdAsync(Guid id);
    Task AddAsync(Attendance attendance);
    Task UpdateAsync(Attendance attendance);
    Task DeleteAsync(Guid id);

    // New method for attendance summary
    Task<List<Attendance>> GetByStaffIdAsync(Guid staffId);
}
