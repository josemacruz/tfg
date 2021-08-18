start:
	@echo Iniciando aplicación
	docker-compose up -d
	google-chrome "http://localhost:3000" &
	mongodb-compass &

stop:
	docker-compose down

build: 
	docker-compose up --build -d

clear:
	docker rmi $(shell docker images -q) -f
	docker rm $(shell docker ps -a -q) -f
	docker network prune