using MediatR;

namespace Erp.Application.Inventory.Products;

public record CreateProductCommand(
    string Name, 
    decimal Price, 
    int Quantity, 
    Guid CategoryId, 
    string? Description
) : IRequest<Guid>;
