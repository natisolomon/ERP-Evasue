using Microsoft.AspNetCore.Mvc;
using Erp.Infrastructure.Persistence;
using Erp.Domain.Inventory;

namespace Erp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ProductsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public IActionResult Create([FromBody] ProductCreateDto dto)
        {
            var category = _context.Categories.Find(dto.CategoryId);
            if (category == null) return NotFound("Category not found");

            var product = new Product(dto.Name, dto.Price, dto.Quantity, dto.CategoryId, dto.Description);
            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] ProductUpdateDto dto)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();
            
            product.Update(dto.Name, dto.Price, dto.Quantity, dto.CategoryId, dto.Description);
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }
    }

    // DTOs
    public class ProductCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
    }

    public class ProductUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
    }
}
