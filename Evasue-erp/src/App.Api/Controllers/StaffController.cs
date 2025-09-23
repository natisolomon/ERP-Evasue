using App.Application.Services;
using App.Domain.Entities.HR;
using Microsoft.AspNetCore.Mvc;

namespace App.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class StaffController : ControllerBase
{
    private readonly StaffService _service;

    public StaffController(StaffService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllStaffAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var staff = await _service.GetStaffByIdAsync(id);
        if (staff == null) return NotFound();
        return Ok(staff);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Staff staff)
    {
        await _service.CreateStaffAsync(staff);
        return CreatedAtAction(nameof(GetById), new { id = staff.Id }, staff);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Staff staff)
    {
        var existingStaff = await _service.GetStaffByIdAsync(id);
        if (existingStaff == null) return NotFound();

        existingStaff.FirstName = staff.FirstName;
        existingStaff.LastName = staff.LastName;
        existingStaff.Email = staff.Email;
        existingStaff.Phone = staff.Phone;
        existingStaff.Department = staff.Department;
        existingStaff.IsActive = staff.IsActive;

        await _service.UpdateStaffAsync(existingStaff);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteStaffAsync(id);
        return NoContent();
    }
}
