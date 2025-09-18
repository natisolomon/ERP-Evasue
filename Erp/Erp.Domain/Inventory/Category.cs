namespace Erp.Domain.Inventory
{
    public class Category
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty; // ✅ default value

        // EF Core requires parameterless constructor
        private Category() { }

        public Category(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }

        public void UpdateName(string newName)
        {
            Name = newName;
        }
    }
}
