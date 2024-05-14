using AutoMapper;
using Moq;
using MyTaskBoard.Api.Dto;
using MyTaskBoard.Api.Helpers;
using MyTaskBoard.Core.Entity;
using MyTaskBoard.Core.Enums;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

namespace MyTaskBoard.Tests
{
    [TestFixture]
    public class ActivityLoggerTests
    {
        private Mock<IBoardListRepository> _mockBoardListRepository;
        private Mock<IActivityLogRepository> _mockActivityLogRepository;
        private Mock<IMapper> _mockMapper;
        private ActivityLogger _activityLogger;

        [SetUp]
        public void Setup()
        {
            _mockBoardListRepository = new Mock<IBoardListRepository>();
            _mockActivityLogRepository = new Mock<IActivityLogRepository>();
            _mockMapper = new Mock<IMapper>();

            _activityLogger = new ActivityLogger(
                _mockBoardListRepository.Object,
                _mockActivityLogRepository.Object,
                _mockMapper.Object);
        }

        [Test]
        public async Task LogOnCreate_CreatesActivityLogCorrectly()
        {
            // Arrange
            var card = new Card { Id = Guid.NewGuid(), Name = "Test Card", BoardListId = Guid.NewGuid(), BoardId = Guid.NewGuid() };
            var activityLog = new ActivityLog();

            _mockMapper.Setup(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>())).Returns(activityLog);
            _mockActivityLogRepository.Setup(r => r.AddAsync(activityLog)).Returns(Task.CompletedTask);

            // Act
            await _activityLogger.LogOnCreate(card);

            // Assert
            _mockMapper.Verify(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>()), Times.Once);
            _mockActivityLogRepository.Verify(r => r.AddAsync(activityLog), Times.Once);
        }

        [Test]
        public async Task LogOnDelete_CreatesActivityLogCorrectly()
        {
            // Arrange
            var card = new Card { Id = Guid.NewGuid(), Name = "Test Delete", BoardId = Guid.NewGuid() };
            var activityLog = new ActivityLog();

            _mockMapper.Setup(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>())).Returns(activityLog);
            _mockActivityLogRepository.Setup(r => r.AddAsync(activityLog)).Returns(Task.CompletedTask);

            // Act
            await _activityLogger.LogOnDelete(card);

            // Assert
            _mockMapper.Verify(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>()), Times.Once);
            _mockActivityLogRepository.Verify(r => r.AddAsync(activityLog), Times.Once);
        }

        [Test]
        public async Task LogOnUpdate_CreatesMultipleLogsForMultipleChanges()
        {
            // Arrange
            var existingCard = new Card { 
                Id = Guid.NewGuid(), 
                Name = "Old Name", 
                BoardListId = Guid.NewGuid(), 
                DueDate = DateTime.Now.AddDays(-1), 
                Priority = Priority.Medium, 
                Description = "Old Description" };

            var newCard = new UpdateCardDto { 
                Name = "New Name", 
                BoardListId = Guid.NewGuid(), 
                DueDate = DateTime.Now, 
                Priority = Priority.High , 
                Description = "New Description" };

            var oldBoardList = new BoardList { Id = existingCard.BoardListId, Name = "Old List" };
            var newBoardList = new BoardList { Id = newCard.BoardListId, Name = "New List" };

            _mockBoardListRepository.Setup(r => r.GetByIdAsync(existingCard.BoardListId)).ReturnsAsync(oldBoardList);
            _mockBoardListRepository.Setup(r => r.GetByIdAsync(newCard.BoardListId)).ReturnsAsync(newBoardList);
            _mockActivityLogRepository.Setup(r => r.AddAsync(It.IsAny<ActivityLog>())).Returns(Task.CompletedTask);
            _mockMapper.Setup(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>())).Returns(new ActivityLog());

            // Act
            await _activityLogger.LogOnUpdate(existingCard, newCard);

            // Assert
            _mockActivityLogRepository.Verify(r => r.AddAsync(It.IsAny<ActivityLog>()), Times.Exactly(5)); // Assuming 5 changes logged
        }

        [Test]
        public void LogOnCreate_ThrowsException_WhenRepositoryFails()
        {
            // Arrange
            var card = new Card { Id = Guid.NewGuid(), Name = "Error Test Card", BoardListId = Guid.NewGuid(), BoardId = Guid.NewGuid() };
            var activityLog = new ActivityLog();

            _mockMapper.Setup(m => m.Map<ActivityLog>(It.IsAny<ActivityLogDto>())).Returns(activityLog);
            _mockActivityLogRepository.Setup(r => r.AddAsync(activityLog)).ThrowsAsync(new Exception("Simulated database failure"));

            // Act & Assert
            Assert.ThrowsAsync<Exception>(async () => await _activityLogger.LogOnCreate(card));
        }
    }
}
