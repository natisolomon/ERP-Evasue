using App.Domain.Entities.HR;

namespace App.Application.Interfaces;

public interface ILeaveRequestRepository
{
    Task<List<LeaveRequest>> GetAllAsync();
    Task<LeaveRequest?> GetByIdAsync(Guid id);
    Task AddAsync(LeaveRequest leaveRequest);
    Task UpdateAsync(LeaveRequest leaveRequest);
}
