namespace App.Domain.Entities.HR;

public class Onboarding
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid StaffId { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
    public string ChecklistStatus { get; set; } = "Not Started"; // In Progress, Completed
}
