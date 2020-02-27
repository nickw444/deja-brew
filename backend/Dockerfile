FROM python:3-alpine

WORKDIR /app

RUN apk add --no-cache libffi-dev openssl-dev build-base  && \
    pip install pipenv
COPY ./Pipfile ./Pipfile.lock ./
RUN pipenv install --system --deploy

COPY . .

CMD ["gunicorn", "-c", "gunicorn.py", "deja_brew.wsgi:app"]
