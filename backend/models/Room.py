import uuid

from models.Player import Player


class Room:
    id: str
    name: str
    board: list[str]
    players: list[Player]
    current_player: Player
    player_turn: int

    def __init__(self, room_name):
        self.name = room_name
        self.id = str(uuid.uuid4())
        self.board = [' ' for _ in range(9)]
        self.players = []
        self.current_player = None
        self.player_turn = 1

    def join(self, user_id: str, websocket):
        if len(self.players) == 2:
            if user_id in list(map(lambda user: user.id, self.players)):
                reconnecting_player = [player for player in self.players if player.id == user_id][0]
                reconnecting_player.websocket.close()
                reconnecting_player.websocket = websocket
            else:
                raise Exception("Reached max player count")
        self.players.append(Player(user_id, websocket))

    async def broadcast_state(self):
        for player in self.players:
            await player.websocket.send_json({"board": self.board})

    def pass_turn(self):
        if self.player_turn == 1:
            self.player_turn -= 1
        if self.player_turn == 0:
            self.player_turn += 1
        self.current_player = self.players[self.player_turn]
