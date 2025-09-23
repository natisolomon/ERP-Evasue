using App.Application.Interfaces;
using App.Domain.Entities.HR;
using App.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace App.Infrastructure.Repositories;

public class OnboardingRepository : IOnboardingRepository
{
    private readonly AppDbContext _context;
    public OnboardingRepository(AppDbContext context) => _context = context;

    public async Task<List<Onboarding>> GetAllAsync() => await _context.Onboardings.ToListAsync();

    public async Task<Onboarding?> GetByIdAsync(Guid id) => await _context.Onboardings.FindAsync(id);

    public async Task AddAsync(Onboarding onboarding)
    {
        await _context.Onboardings.AddAsync(onboarding);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Onboarding onboarding)
    {
        _context.Onboardings.Update(onboarding);
        await _context.SaveChangesAsync();
    }
}
