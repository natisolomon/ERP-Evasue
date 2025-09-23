using App.Application.Interfaces;
using App.Domain.Entities.HR;
using App.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace App.Infrastructure.Repositories;

public class LeaveRequestRepository : ILeaveRequestRepository
{
    private readonly AppDbContext _context;
    public LeaveRequestRepository(AppDbContext context) => _context = context;

    public async Task<List<LeaveRequest>> GetAllAsync() => await _context.LeaveRequests.ToListAsync();

    public async Task<LeaveRequest?> GetByIdAsync(Guid id) => await _context.LeaveRequests.FindAsync(id);

    public async Task AddAsync(LeaveRequest leaveRequest)
    {
        await _context.LeaveRequests.AddAsync(leaveRequest);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(LeaveRequest leaveRequest)
    {
        _context.LeaveRequests.Update(leaveRequest);
        await _context.SaveChangesAsync();
    }
}
