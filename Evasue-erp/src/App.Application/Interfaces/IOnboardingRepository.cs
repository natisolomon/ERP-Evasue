using App.Domain.Entities.HR;

namespace App.Application.Interfaces;

public interface IOnboardingRepository
{
    Task<List<Onboarding>> GetAllAsync();
    Task<Onboarding?> GetByIdAsync(Guid id);
    Task AddAsync(Onboarding onboarding);
    Task UpdateAsync(Onboarding onboarding);
}
