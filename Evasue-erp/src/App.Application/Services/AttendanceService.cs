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

    public async Task DeleteAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing != null)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
