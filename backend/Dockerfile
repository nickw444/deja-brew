FROM python:3.8-alpine

WORKDIR /app

RUN apk add --no-cache libffi-dev openssl-dev build-base mariadb-connector-c-dev && \
    pip install pipenv
COPY ./Pipfile ./Pipfile.lock ./
RUN pipenv install --system --deploy

COPY . .

EXPOSE 8080
CMD ["gunicorn", "-c", "gunicorn.py", "deja_brew.wsgi:app"]
