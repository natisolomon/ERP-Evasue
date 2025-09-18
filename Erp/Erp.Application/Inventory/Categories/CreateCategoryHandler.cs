using Erp.Application.Common.Interfaces;
using Erp.Domain.Inventory;

namespace Erp.Application.Inventory.Categories;

public class CreateCategoryHandler
{
    private readonly IErpDbContext _db;

    public CreateCategoryHandler(IErpDbContext db)
    {
        _db = db;
    }

    public async Task<Guid> Handle(string categoryName, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(categoryName))
            throw new ArgumentException("Category name cannot be empty.");

        var category = new Category(categoryName);

        _db.Add(category);
        await _db.SaveChangesAsync(cancellationToken);

        return category.Id;
    }
}
