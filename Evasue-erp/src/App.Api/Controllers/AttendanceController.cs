using App.Application.Services;
using App.Domain.Entities.HR;
using Microsoft.AspNetCore.Mvc;

namespace App.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly AttendanceService _service;

    public AttendanceController(AttendanceService service)
    {
        _service = service;
    }

    // GET: api/v1/attendance
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var attendances = await _service.GetAllAsync();
        return Ok(attendances);
    }

    // GET: api/v1/attendance/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var attendance = await _service.GetByIdAsync(id);
        if (attendance == null) return NotFound();
        return Ok(attendance);
    }

    // POST: api/v1/attendance
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Attendance attendance)
    {
        await _service.AddAsync(attendance);
        return CreatedAtAction(nameof(GetById), new { id = attendance.Id }, attendance);
    }

    // PUT: api/v1/attendance/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Attendance attendance)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        existing.StaffId = attendance.StaffId;
        existing.Date = attendance.Date;
        existing.IsPresent = attendance.IsPresent;

        await _service.AddAsync(existing); // or UpdateAsync if implemented
        return NoContent();
    }

    // DELETE: api/v1/attendance/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }
}
