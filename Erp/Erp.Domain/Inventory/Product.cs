namespace Erp.Domain.Inventory
{
    public class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public decimal Price { get; private set; }
        public int Quantity { get; private set; }
        public string? Description { get; private set; } // nullable
        public Guid CategoryId { get; private set; }
        public Category Category { get; private set; } = null!;

        private Product() { }

        public Product(string name, decimal price, int quantity, Guid categoryId, string? description = null)
        {
            Id = Guid.NewGuid();
            Name = name;
            Price = price;
            Quantity = quantity;
            CategoryId = categoryId;
            Description = description;
        }

        public void Update(string newName, decimal newPrice, int newQuantity, Guid newCategoryId, string? newDescription = null)
        {
            Name = newName;
            Price = newPrice;
            Quantity = newQuantity;
            CategoryId = newCategoryId;
            Description = newDescription;
        }
    }
}
