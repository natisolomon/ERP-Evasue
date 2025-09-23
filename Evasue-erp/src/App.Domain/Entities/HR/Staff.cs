namespace App.Domain.Entities.HR;

public class Staff
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = "";
    public string Department { get; set; } = "";
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}
