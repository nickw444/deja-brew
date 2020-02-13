from flask import abort
from flask_login import current_user
from flask_restful import Resource

from deja_brew.api.user_dto import GetUserInfoResponse


class UserResource(Resource):
    def get(self, user_id: str):
        if user_id != "me":
            abort(403)

        if current_user.is_anonymous:
            abort(403)

        return GetUserInfoResponse().dump(dict(
            user=current_user,
        ))
