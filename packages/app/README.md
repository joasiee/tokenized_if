## Start app in container
docker build -t if_app .
docker run -d -p8080:80 if_app