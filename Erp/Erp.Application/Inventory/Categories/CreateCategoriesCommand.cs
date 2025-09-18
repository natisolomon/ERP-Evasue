using MediatR;

namespace Erp.Application.Inventory.Categories;

// This is the command to create a new category
public record CreateCategoryCommand(string Name) : IRequest<Guid>;
