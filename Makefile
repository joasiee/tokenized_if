clean: 
	docker-compose down --rmi all --volumes --remove-orphans
logs: 
	docker-compose logs -f
reset: stop clean start
start: 
	docker-compose up -d --remove-orphans
start-attached:	
	docker-compose up --remove-orphans
stop:
	docker-compose down --remove-orphans
