using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using MyTaskBoard.Api.Middleware;
using System.Net;

namespace MyTaskBoard.Tests
{
    [TestFixture]
    public class ExceptionMiddlewareTests
    {
        private Mock<RequestDelegate> _nextMock;
        private Mock<ILogger<ExceptionMiddleware>> _loggerMock;
        private Mock<IHostEnvironment> _envMock;
        private ExceptionMiddleware _middleware;

        [SetUp]
        public void Setup()
        {
            _nextMock = new Mock<RequestDelegate>();
            _loggerMock = new Mock<ILogger<ExceptionMiddleware>>();
            _envMock = new Mock<IHostEnvironment>();
            _middleware = new ExceptionMiddleware(_nextMock.Object, _loggerMock.Object, _envMock.Object);
        }

        private DefaultHttpContext CreateHttpContext()
        {
            return new DefaultHttpContext
            {
                Response = { Body = new MemoryStream() }
            };
        }

        private string ReadResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            using var reader = new StreamReader(response.Body);
            return reader.ReadToEnd();
        }

        [Test]
        public async Task InvokeAsync_InProduction_HidesDetails()
        {
            // Arrange
            var context = CreateHttpContext();
            var exception = new InvalidOperationException("Sensitive Information");
            _nextMock.Setup(n => n(It.IsAny<HttpContext>())).ThrowsAsync(exception);
            _envMock.Setup(env => env.EnvironmentName).Returns(Environments.Production);

            // Act
            await _middleware.InvokeAsync(context);

            // Assert
            var response = ReadResponse(context.Response);
            Assert.IsFalse(response.Contains("Sensitive Information"), "The response should not contain sensitive information.");
            Assert.IsTrue(response.Contains("Internal Server Error"), "The response should indicate an internal server error.");
            Assert.AreEqual((int)HttpStatusCode.InternalServerError, context.Response.StatusCode);
            Assert.AreEqual("application/json", context.Response.ContentType);
        }
    }
}
    