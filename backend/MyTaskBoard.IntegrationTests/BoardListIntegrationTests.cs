using FluentAssertions;
using MyTaskBoard.Api.Dto;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace MyTaskBoard.IntegrationTests
{
    public class BoardListIntegrationTests
    {
        [Fact]
        public async Task GetByBoardId_ReturnsBoardLists()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var boardId = Guid.NewGuid();

            var addBoardListDto = new AddBoardListDto
            {
                BoardId = boardId,
                Name = "Test Board List"
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(addBoardListDto), Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync("/api/boardlist", postContent);
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);

            var response = await client.GetAsync($"/api/boardlist/board/{boardId}");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var responseString = await response.Content.ReadAsStringAsync();
            var boardLists = JsonConvert.DeserializeObject<IEnumerable<BoardListDto>>(responseString);

            boardLists.Should().NotBeNull();
            boardLists.Should().HaveCountGreaterThan(0);
        }

        [Fact]
        public async Task GetBoardList_ReturnsBoardList()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var boardListId = Guid.NewGuid();

            var addBoardListDto = new AddBoardListDto
            {
                BoardId = Guid.NewGuid(),
                Name = "Test Board List"
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(addBoardListDto), Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync("/api/boardlist", postContent);
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var createdBoardList = JsonConvert.DeserializeObject<BoardListDto>(await postResponse.Content.ReadAsStringAsync());

            var response = await client.GetAsync($"/api/boardlist/{createdBoardList.Id}");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var responseString = await response.Content.ReadAsStringAsync();
            var boardList = JsonConvert.DeserializeObject<BoardListDto>(responseString);

            boardList.Should().NotBeNull();
            boardList.Id.Should().Be(createdBoardList.Id);
        }

        [Fact]
        public async Task Post_AddBoardList_ReturnsCreatedBoardList()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var addBoardListDto = new AddBoardListDto
            {
                BoardId = Guid.NewGuid(),
                Name = "New Board List"
            };
            var content = new StringContent(JsonConvert.SerializeObject(addBoardListDto), Encoding.UTF8, "application/json");

            var response = await client.PostAsync("/api/boardlist", content);

            response.StatusCode.Should().Be(HttpStatusCode.Created);
            var responseString = await response.Content.ReadAsStringAsync();
            var createdBoardList = JsonConvert.DeserializeObject<BoardListDto>(responseString);

            createdBoardList.Should().NotBeNull();
            createdBoardList.Name.Should().Be("New Board List");
        }

        [Fact]
        public async Task Patch_UpdateBoardList_ReturnsNoContent()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var addBoardListDto = new AddBoardListDto
            {
                BoardId = Guid.NewGuid(),
                Name = "New Board List"
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(addBoardListDto), Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync("/api/boardlist", postContent);
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var createdBoardList = JsonConvert.DeserializeObject<BoardListDto>(await postResponse.Content.ReadAsStringAsync());

            var updatedBoardListDto = new BoardListDto
            {
                Id = createdBoardList.Id,
                BoardId = createdBoardList.BoardId,
                Name = "Updated Board List"
            };
            var patchContent = new StringContent(JsonConvert.SerializeObject(updatedBoardListDto), Encoding.UTF8, "application/json");

            var patchResponse = await client.PatchAsync($"/api/boardlist/{createdBoardList.Id}", patchContent);

            patchResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var getResponse = await client.GetAsync($"/api/boardlist/{createdBoardList.Id}");
            getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var getResponseString = await getResponse.Content.ReadAsStringAsync();
            var updatedBoardList = JsonConvert.DeserializeObject<BoardListDto>(getResponseString);
            updatedBoardList.Name.Should().Be("Updated Board List");
        }

        [Fact]
        public async Task Delete_DeleteBoardList_ReturnsNoContent()
        {
            await using var factory = new MyTaskBoardWebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var addBoardListDto = new AddBoardListDto
            {
                BoardId = Guid.NewGuid(),
                Name = "New Board List"
            };
            var postContent = new StringContent(JsonConvert.SerializeObject(addBoardListDto), Encoding.UTF8, "application/json");
            var postResponse = await client.PostAsync("/api/boardlist", postContent);
            postResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var createdBoardList = JsonConvert.DeserializeObject<BoardListDto>(await postResponse.Content.ReadAsStringAsync());

            var deleteResponse = await client.DeleteAsync($"/api/boardlist/{createdBoardList.Id}");

            deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var getResponse = await client.GetAsync($"/api/boardlist/{createdBoardList.Id}");
            getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
    }
}
