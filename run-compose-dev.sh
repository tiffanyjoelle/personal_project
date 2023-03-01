#!/bin/bash

# These environment variables are consumed by the docker-compose file.
export SECRET_KEY=abc123
export DEBUG=True
export VA_API_KEY=$1

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec personal_project-api-1  python /src/manage.py makemigrations 
docker exec personal_project-api-1  python /src/manage.py migrate
