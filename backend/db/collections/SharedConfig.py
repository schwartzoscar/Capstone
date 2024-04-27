from abc import ABC
from enum import Enum


class Collection(Enum):
    USERS = 'users'
    POSTS = 'posts'
    FORUMS = 'forums'
    FOLLOWS = 'follows'


def_fields = {
    Collection.USERS: {"username": 1, 'email': 1, "profile_img": 1, "created_at": 1}
}


class Config(ABC):

    @staticmethod
    def get_name(c):
        if isinstance(c, Collection):
            return c.value
        else:
            raise KeyError(f"Collection {c} is not valid.")

    @staticmethod
    def get_def_fields(c):
        if not isinstance(c, Collection):
            raise KeyError(f"Collection {c} is not valid.")
        if c in def_fields:
            return def_fields[c]
        return {}
