using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository.Base;

namespace MyTaskBoard.Tests
{
    [TestFixture]
    public class EntityBaseRepositoryTests
    {
        private DataContext _context;
        private EntityBaseRepository<Board> _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new DataContext(options);
            _repository = new EntityBaseRepository<Board>(_context);

            _context.Database.EnsureCreated();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task AddAsync_EntityIsAdded()
        {
            var entity = new Board { Id = Guid.NewGuid(), Name = "Test" };

            await _repository.AddAsync(entity);

            Assert.IsTrue(_context.Set<Board>().Any(e => e.Id == entity.Id && e.Name == "Test"));
        }

        [Test]
        public async Task GetAllAsync_ReturnsAllEntities()
        {
            _context.Set<Board>().AddRange(
                new Board { Id = Guid.NewGuid(), Name = "Entity1" },
                new Board { Id = Guid.NewGuid(), Name = "Entity2" }
            );
            await _context.SaveChangesAsync();

            var results = await _repository.GetAllAsync();

            Assert.AreEqual(2, results.Count());
        }

        [Test]
        public async Task GetByIdAsync_ReturnsEntityById()
        {
            var id = Guid.NewGuid();
            _context.Set<Board>().Add(new Board { Id = id, Name = "Entity1" });
            await _context.SaveChangesAsync();

            var result = await _repository.GetByIdAsync(id);

            Assert.IsNotNull(result);
            Assert.AreEqual("Entity1", result.Name);
        }

        [Test]
        public async Task UpdateAsync_UpdatesEntity()
        {
            var entity = new Board { Id = Guid.NewGuid(), Name = "OldName" };
            _context.Set<Board>().Add(entity);
            await _context.SaveChangesAsync();

            entity.Name = "NewName";
            await _repository.UpdateAsync(entity.Id, entity);

            var updatedEntity = await _repository.GetByIdAsync(entity.Id);
            Assert.AreEqual("NewName", updatedEntity.Name);
        }

        [Test]
        public async Task DeleteAsync_DeletesEntity()
        {
            var entity = new Board { Id = Guid.NewGuid(), Name = "Entity" };
            _context.Set<Board>().Add(entity);
            await _context.SaveChangesAsync();

            await _repository.DeleteAsync(entity.Id);

            var deletedEntity = await _repository.GetByIdAsync(entity.Id);
            Assert.IsNull(deletedEntity);
        }
    }
}
