using AutoMapper;
using MyTaskBoard.Core.Entity;

namespace MyTaskBoard.Api.Dto.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<BoardListDto, BoardList>();
            CreateMap<BoardList, BoardListDto>();

            CreateMap<AddBoardListDto, BoardList>();

            CreateMap<Card, CardDto>();
            CreateMap<CardDto, Card>();

            CreateMap<AddCardDto, Card>();
            CreateMap<Card, AddCardDto>();

            CreateMap<UpdateCardDto, Card>();
            CreateMap<Card, UpdateCardDto>();

            CreateMap<ActivityLog, ActivityLogDto>();
            CreateMap<ActivityLogDto, ActivityLog>();
        }
    }
}
