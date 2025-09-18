using Microsoft.AspNetCore.Mvc;
using Erp.Infrastructure.Persistence;
using Erp.Domain.Inventory;

namespace Erp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public CategoriesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/categories
        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }

        // GET: api/categories/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();
            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public IActionResult Create([FromBody] Category request)
        {
            var category = new Category(request.Name); // ✅ use constructor
            _context.Categories.Add(category);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        // PUT: api/categories/{id}
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] Category request)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();

            category.UpdateName(request.Name); // ✅ use method instead of setter
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/categories/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
