using App.Application.Services;
using App.Domain.Entities.HR;
using Microsoft.AspNetCore.Mvc;

namespace App.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class LeaveRequestController : ControllerBase
{
    private readonly LeaveRequestService _service;
    public LeaveRequestController(LeaveRequestService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var leave = await _service.GetByIdAsync(id);
        if (leave == null) return NotFound();
        return Ok(leave);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] LeaveRequest leaveRequest)
    {
        await _service.CreateAsync(leaveRequest);
        return CreatedAtAction(nameof(GetById), new { id = leaveRequest.Id }, leaveRequest);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] LeaveRequest leaveRequest)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        existing.StartDate = leaveRequest.StartDate;
        existing.EndDate = leaveRequest.EndDate;
        existing.Reason = leaveRequest.Reason;
        existing.Status = leaveRequest.Status;

        await _service.UpdateAsync(existing);
        return NoContent();
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(Guid id)
    {
        await _service.ApproveAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(Guid id)
    {
        await _service.RejectAsync(id);
        return NoContent();
    }
}
