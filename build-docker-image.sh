docker build -t tcc.frontend .
docker run --name tcc.frontend -d -p 8080:80 tcc.frontend