from flask_login import LoginManager

from deja_brew.repository import User, db

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).filter_by(id=user_id).first()
