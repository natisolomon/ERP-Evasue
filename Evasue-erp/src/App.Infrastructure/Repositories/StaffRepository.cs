using App.Domain.Entities.HR;
using App.Application.Interfaces;
using App.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace App.Infrastructure.Repositories;

public class StaffRepository : IStaffRepository
{
    private readonly AppDbContext _context;

    public StaffRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Staff>> GetAllAsync() => await _context.Staffs.ToListAsync();

    public async Task<Staff?> GetByIdAsync(Guid id) => 
        await _context.Staffs.FindAsync(id);

    public async Task AddAsync(Staff staff)
    {
        await _context.Staffs.AddAsync(staff);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Staff staff)
    {
        _context.Staffs.Update(staff);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var staff = await _context.Staffs.FindAsync(id);
        if (staff != null)
        {
            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();
        }
    }
}
