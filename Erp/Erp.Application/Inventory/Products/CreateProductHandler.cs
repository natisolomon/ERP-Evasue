using Erp.Domain.Inventory;
using Erp.Application.Common.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Erp.Application.Inventory.Products
{
    public class CreateProductHandler
    {
        private readonly IErpDbContext _context;

        public CreateProductHandler(IErpDbContext context)
        {
            _context = context;
        }

        public async Task<Product> Handle(string name, decimal price, int quantity, Guid categoryId, string? description, CancellationToken cancellationToken)
        {
            // Check if category exists
            var category = await _context.Categories.FindAsync(new object[] { categoryId }, cancellationToken);
            if (category == null)
                throw new Exception("Category not found");

            // Create Product with all required fields
            var product = new Product(name, price, quantity, categoryId, description);

            // Add to DbContext
            _context.Products.Add(product);
            await _context.SaveChangesAsync(cancellationToken);

            return product;
        }
    }
}
