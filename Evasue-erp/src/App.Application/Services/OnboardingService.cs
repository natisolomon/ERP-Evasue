using App.Application.Interfaces;
using App.Domain.Entities.HR;

namespace App.Application.Services;

public class OnboardingService
{
    private readonly IOnboardingRepository _repository;
    public OnboardingService(IOnboardingRepository repository) => _repository = repository;

    public async Task<List<Onboarding>> GetAllAsync() => await _repository.GetAllAsync();

    public async Task<Onboarding?> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

    public async Task CreateAsync(Onboarding onboarding) => await _repository.AddAsync(onboarding);

    public async Task UpdateAsync(Onboarding onboarding) => await _repository.UpdateAsync(onboarding);
}
