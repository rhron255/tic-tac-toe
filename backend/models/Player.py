from fastapi.websockets import WebSocket


class Player:
    id: str
    websocket: WebSocket

    def __init__(self, id, websocket):
        self.id = id
        self.websocket = websocket

    def update(self, board, current_player):
        self.websocket.send_json({'board': board, 'current_player': current_player})