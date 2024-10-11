import uuid

import uvicorn
from fastapi import FastAPI, Response
from starlette.websockets import WebSocket

from UserManager import UserManager
from dto.RoomDto import RoomDto
from models.Room import Room

app = FastAPI(servers=[{"url": "/api"}])

users = UserManager("./users.json")
rooms: dict[str, Room] = {}
counter = 0
shapes = {}


@app.get("/login", tags=["login"])
async def login(username: str, response: Response):
    if username not in users:
        user_id = str(uuid.uuid4())
        users[username] = user_id
    response.set_cookie("user_id", users[username])
    response.set_cookie("username", username)
    return {"message": "Logged in successfully!"}


@app.get("/rooms/create", tags=["rooms"])
async def create_room(room_name: str) -> RoomDto:
    new_room = Room(room_name)
    rooms[new_room.id] = new_room
    return RoomDto(id=new_room.id, name=room_name)


@app.get("/rooms", tags=["rooms"])
async def get_all_rooms() -> list[RoomDto]:
    return [RoomDto(id=room.id, name=room.name) for room in rooms.values()]


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(room_id: str, user_id: str, websocket: WebSocket):
    global counter
    # TODO add websocket broadcast to other user
    await websocket.accept()
    if room_id in rooms:
        current_room = rooms[room_id]
        current_room.join(user_id, websocket)
        while True:
            print(f"Sending data from {user_id}")
            print("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
            if user_id not in shapes:
                user_shape = 'X' if counter % 2 == 0 else 'O'
                shapes[user_id] = user_shape
            else:
                user_shape = shapes[user_id]
            await websocket.send_json({"board": current_room.board, "shape": user_shape})
            counter += 1
            print(f"Receiving data from {user_id}")
            json_ = await websocket.receive_json()
            print(json_)
            current_room.board = json_
            await current_room.broadcast_state()
            # if current_room.current_player.id == user_id:
            #     current_room.pass_turn()


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
