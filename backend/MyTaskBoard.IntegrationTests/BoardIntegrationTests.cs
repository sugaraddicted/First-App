using FluentAssertions;
using MyTaskBoard.Api.Dto;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace MyTaskBoard.IntegrationTests
{
    public class BoardIntegrationTests : IClassFixture<MyTaskBoardWebApplicationFactory<Program>>
    {
        [Fact]
        public async Task Post_CreateBoard_ReturnsCreatedBoard()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var boardName = "New Board";
            var content = new StringContent("", Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"/api/board/{boardName}", content);

            response.StatusCode.Should().Be(HttpStatusCode.Created);
            var responseString = await response.Content.ReadAsStringAsync();
            var createdBoard = JsonConvert.DeserializeObject<BoardDto>(responseString);
            createdBoard.Name.Should().Be(boardName);
        }

        [Fact]
        public async Task Patch_UpdateBoard_ReturnsUpdatedBoard()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var boardName = "New Board";
            var postContent = new StringContent("", Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync($"/api/board/{boardName}", postContent);
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var createdBoard = JsonConvert.DeserializeObject<BoardDto>(await postResponse.Content.ReadAsStringAsync());

            var updatedBoardDto = new BoardDto
            {
                Id = createdBoard.Id,
                Name = "Updated Board",
                Lists = createdBoard.Lists 
            };
            var patchContent = new StringContent(JsonConvert.SerializeObject(updatedBoardDto), Encoding.UTF8, "application/json");

            var patchResponse = await client.PatchAsync($"/api/board/{createdBoard.Id}", patchContent);

            if (patchResponse.StatusCode == HttpStatusCode.BadRequest)
            {
                var errorContent = await patchResponse.Content.ReadAsStringAsync();
                Assert.False(true, $"Expected NoContent but got BadRequest with content: {errorContent}");
            }

            patchResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var getResponse = await client.GetAsync($"/api/board/{createdBoard.Id}");
            getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var getResponseString = await getResponse.Content.ReadAsStringAsync();
            var updatedBoard = JsonConvert.DeserializeObject<BoardDto>(getResponseString);
            updatedBoard.Name.Should().Be("Updated Board");
        }

        [Fact]
        public async Task Delete_DeleteBoard_ReturnsNoContent()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var boardName = "New Board";
            var postContent = new StringContent("", Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync($"/api/board/{boardName}", postContent);
            var createdBoard = JsonConvert.DeserializeObject<BoardDto>(await postResponse.Content.ReadAsStringAsync());

            var deleteResponse = await client.DeleteAsync($"/api/board/{createdBoard.Id}");

            deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var getResponse = await client.GetAsync($"/api/board/{createdBoard.Id}");
            getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }
}