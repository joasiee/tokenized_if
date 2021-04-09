#/bin/bash

docker-compose -p lsp down
docker-compose -p importer down
docker-compose -p financer down
docker volume prune -f
