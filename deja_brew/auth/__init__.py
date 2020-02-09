import uuid

import requests
from flask import Blueprint, request, redirect, current_app, session, abort
# https://accounts.google.com/.well-known/openid-configuration
from flask_login import login_user
from oauthlib.oauth2 import WebApplicationClient

from deja_brew.repository import db, User

GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
GOOGLE_USER_INFO_ENDPOINT = "https://openidconnect.googleapis.com/v1/userinfo"

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login/google')
def login():
    client: WebApplicationClient = current_app.oauth_client
    state = uuid.uuid4().hex

    request_uri = client.prepare_request_uri(
        uri=GOOGLE_AUTH_ENDPOINT,
        redirect_uri=request.base_url + '/callback',
        scope=["email", "profile"],
        state=state,
        hd=current_app.config['GOOGLE_HOSTED_DOMAIN'],
    )

    session['OAUTH_STATE'] = state
    return redirect(request_uri)


@auth_bp.route('/login/google/callback')
def login_callback():
    client: WebApplicationClient = current_app.oauth_client
    state = session['OAUTH_STATE']

    token_url, headers, body = client.prepare_token_request(
        token_url=GOOGLE_TOKEN_ENDPOINT,
        authorization_response=request.url,
        redirect_url=request.base_url,
        state=state,
    )

    token_resp = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(
            current_app.config['GOOGLE_CLIENT_ID'],
            current_app.config['GOOGLE_CLIENT_SECRET']
        ),
    )
    token_resp.raise_for_status()
    parsed_resp = client.parse_request_body_response(token_resp.text)

    user_info_resp = requests.get(GOOGLE_USER_INFO_ENDPOINT, headers={
        'Authorization': 'Bearer ' + parsed_resp['access_token']
    })
    user_info_resp.raise_for_status()
    user_info = user_info_resp.json()

    hosted_domain = current_app.config['GOOGLE_HOSTED_DOMAIN']
    if hosted_domain and hosted_domain != "*":
        if user_info['hd'] != current_app.config['GOOGLE_HOSTED_DOMAIN']:
            # User is not on the required Google hosted domain. Disallow login.
            abort(403)

    user = db.session.query(User).filter_by(email=user_info['email']).first()
    if user is None:
        user = User(
            name=user_info['name'],
            email=user_info['email'],
            avatar_url=user_info['picture'],
        )
        db.session.add(user)
        db.session.commit()

    login_user(user)
    return redirect('/')
