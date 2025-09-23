namespace App.Domain.Entities.HR;

public class Attendance
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid StaffId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public bool IsPresent { get; set; } = true;
}
