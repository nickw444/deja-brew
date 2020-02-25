FROM python:3-alpine

WORKDIR /app

RUN pip install pipenv
COPY Pipfile Pipefile.lock ./
RUN pipenv install --system --deploy

COPY . .
