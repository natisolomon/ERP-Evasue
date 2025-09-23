using App.Domain.Entities.HR;

namespace App.Application.Interfaces;

public interface IStaffRepository
{
    Task<List<Staff>> GetAllAsync();
    Task<Staff?> GetByIdAsync(Guid id);
    Task AddAsync(Staff staff);
    Task UpdateAsync(Staff staff);
    Task DeleteAsync(Guid id);
}
