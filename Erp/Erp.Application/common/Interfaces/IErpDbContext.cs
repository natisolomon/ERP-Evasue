using Erp.Domain.Inventory;
using Microsoft.EntityFrameworkCore;

namespace Erp.Application.Common.Interfaces;

public interface IErpDbContext
{
    DbSet<Category> Categories { get; }
    DbSet<Product> Products { get; }

    void Add<T>(T entity) where T : class;
    void Update<T>(T entity) where T : class;
    void Remove<T>(T entity) where T : class;
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
