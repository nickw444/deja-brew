from flask import abort
from flask.views import MethodView
from flask_login import current_user

from deja_brew.api.user_dto import GetUserInfoResponse


class UserView(MethodView):
    def get(self, user_id: str):
        if user_id != "me":
            abort(403)

        if current_user.is_anonymous:
            abort(403)

        return GetUserInfoResponse().dump(
            dict(
                user=current_user,
            )
        )
