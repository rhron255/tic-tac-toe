import uuid
import uvicorn
from UserManager import UserManager
from dto.RoomDto import RoomDto
from fastapi import FastAPI, Response
from fastapi.routing import APIRoute
from models.Room import Room
from starlette.staticfiles import StaticFiles
from starlette.websockets import WebSocket

app = FastAPI(servers=[{"url": "/api"}])

users = UserManager("./users.json")
rooms: dict[str, Room] = {}
counter = 0
shapes = {}

app.mount("/static", StaticFiles(directory="static"), name="static")


def init_rooms():
    for i in range(20):
        new_room = Room(f"Test room {i}")
        rooms[new_room.id] = new_room


init_rooms()


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
            if user_id not in shapes:
                user_shape = 'X' if counter % 2 == 0 else 'O'
                shapes[user_id] = user_shape
            else:
                user_shape = shapes[user_id]
            await websocket.send_json({"board": current_room.board, "shape": user_shape})
            counter += 1
            json_ = await websocket.receive_json()
            current_room.board = json_
            await current_room.broadcast_state()


def use_route_names_as_operation_ids(fast_api_app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in fast_api_app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)
