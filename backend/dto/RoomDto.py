from pydantic import BaseModel


class RoomDto(BaseModel):
    id: str
    name: str
