using App.Domain.Entities.HR;

public interface IAttendanceRepository
{
    Task<List<Attendance>> GetAllAsync();
    Task<Attendance?> GetByIdAsync(Guid id);
    Task AddAsync(Attendance attendance);
    Task UpdateAsync(Attendance attendance);
    Task DeleteAsync(Guid id); // ← add this
}


public interface ILeaveRequestRepository
{
    Task<List<LeaveRequest>> GetAllAsync();
    Task<LeaveRequest?> GetByIdAsync(Guid id);
    Task AddAsync(LeaveRequest leaveRequest);
    Task UpdateAsync(LeaveRequest leaveRequest);
}

public interface IOnboardingRepository
{
    Task<List<Onboarding>> GetAllAsync();
    Task<Onboarding?> GetByIdAsync(Guid id);
    Task AddAsync(Onboarding onboarding);
    Task UpdateAsync(Onboarding onboarding);
}
