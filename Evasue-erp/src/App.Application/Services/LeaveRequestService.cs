using App.Application.Interfaces;
using App.Domain.Entities.HR;

namespace App.Application.Services;

public class LeaveRequestService
{
    private readonly ILeaveRequestRepository _repository;
    public LeaveRequestService(ILeaveRequestRepository repository) => _repository = repository;

    public async Task<List<LeaveRequest>> GetAllAsync() => await _repository.GetAllAsync();

    public async Task<LeaveRequest?> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

    public async Task CreateAsync(LeaveRequest leaveRequest) => await _repository.AddAsync(leaveRequest);

    public async Task UpdateAsync(LeaveRequest leaveRequest) => await _repository.UpdateAsync(leaveRequest);

    public async Task ApproveAsync(Guid id)
    {
        var request = await _repository.GetByIdAsync(id);
        if (request == null) throw new Exception("Leave not found");
        request.Status = LeaveStatus.Approved;
        await _repository.UpdateAsync(request);
    }

    public async Task RejectAsync(Guid id)
    {
        var request = await _repository.GetByIdAsync(id);
        if (request == null) throw new Exception("Leave not found");
        request.Status = LeaveStatus.Rejected;
        await _repository.UpdateAsync(request);
    }
}
