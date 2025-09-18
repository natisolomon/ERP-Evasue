namespace Erp.Domain.Inventory;

public enum MovementType { In, Out }

public class StockMovement
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid ProductId { get; private set; }
    public Product Product { get; private set; } = default!;
    public int Quantity { get; private set; }
    public MovementType Type { get; private set; }
    public DateTime Date { get; private set; } = DateTime.UtcNow;

    private StockMovement() { }

    public StockMovement(Guid productId, int quantity, MovementType type)
    {
        ProductId = productId;
        Quantity = quantity;
        Type = type;
    }
}
