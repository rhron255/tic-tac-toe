import json
import logging
import os.path


class User:
    username: str
    user_id: str


class UserManager(dict[str, str]):
    users_file_path: str

    def __init__(self, users_file_path):
        super().__init__()
        self.users_file_path = users_file_path
        if os.path.exists(users_file_path):
            with open(users_file_path, 'r') as users_file:
                try:
                    self.update(json.load(users_file))
                except Exception as e:
                    logging.getLogger('fastapi').error('could not load users!')

    def __setitem__(self, key, value):
        super().__setitem__(key, value)
        with open(self.users_file_path, 'w') as users_file:
            json.dump(self, users_file)
