using App.Application.Interfaces;
using App.Domain.Entities.HR;
using App.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace App.Infrastructure.Repositories;

public class AttendanceRepository : IAttendanceRepository
{
    private readonly AppDbContext _context;
    public AttendanceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Attendance>> GetAllAsync() => await _context.Attendances.ToListAsync();

    public async Task<Attendance?> GetByIdAsync(Guid id) => await _context.Attendances.FindAsync(id);

    public async Task AddAsync(Attendance attendance)
    {
        await _context.Attendances.AddAsync(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Attendance attendance)
    {
        _context.Attendances.Update(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var attendance = await _context.Attendances.FindAsync(id);
        if (attendance != null)
        {
            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();
        }
    }
}
