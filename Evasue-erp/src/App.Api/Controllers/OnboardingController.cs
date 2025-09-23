using App.Application.Services;
using App.Domain.Entities.HR;
using Microsoft.AspNetCore.Mvc;

namespace App.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class OnboardingController : ControllerBase
{
    private readonly OnboardingService _service;
    public OnboardingController(OnboardingService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var onboarding = await _service.GetByIdAsync(id);
        if (onboarding == null) return NotFound();
        return Ok(onboarding);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Onboarding onboarding)
    {
        await _service.CreateAsync(onboarding);
        return CreatedAtAction(nameof(GetById), new { id = onboarding.Id }, onboarding);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Onboarding onboarding)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        existing.StartDate = onboarding.StartDate;
        existing.ChecklistStatus = onboarding.ChecklistStatus;

        await _service.UpdateAsync(existing);
        return NoContent();
    }
}
