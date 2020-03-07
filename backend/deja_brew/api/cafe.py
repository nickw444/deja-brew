from flask import request, abort
from flask.views import MethodView
from flask_login import current_user, login_required

from deja_brew.api.cafe_dto import UpdateCafeRequest, GetCafeResponse, UpdateCafeResponse
from deja_brew.repository import db
from deja_brew.repository.cafe import Cafe
from deja_brew.repository.user import Role


class CafeView(MethodView):
    @login_required
    def get(self):
        cafe = db.session.query(Cafe).first_or_404()

        return GetCafeResponse().dump(dict(
            cafe=cafe
        ))

    @login_required
    def post(self):
        if not current_user.has_any_role(Role.CAFE_STAFF, Role.ADMIN):
            abort(403)

        req = UpdateCafeRequest().load(request.get_json())
        cafe = db.session.query(Cafe).first()
        if cafe is None:
            cafe = Cafe()
            db.session.add(cafe)

        cafe.accepting_orders = req['accepting_orders']
        db.session.commit()

        return UpdateCafeResponse().dump(dict(
            cafe=cafe
        ))
