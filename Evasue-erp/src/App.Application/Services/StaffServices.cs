using App.Application.Interfaces;
using App.Domain.Entities.HR;

namespace App.Application.Services;

public class StaffService
{
    private readonly IStaffRepository _repository;

    public StaffService(IStaffRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Staff>> GetAllStaffAsync() => await _repository.GetAllAsync();

    public async Task<Staff?> GetStaffByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

    public async Task CreateStaffAsync(Staff staff) => await _repository.AddAsync(staff);

    public async Task UpdateStaffAsync(Staff staff) => await _repository.UpdateAsync(staff);

    public async Task DeleteStaffAsync(Guid id) => await _repository.DeleteAsync(id);
}
