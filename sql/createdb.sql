# Conéctate al servidor PostgreSQL como el usuario postgres (o un usuario con privilegios de creación de bases de datos)

# Crea una nueva base de datos llamada 'visitantes'
CREATE DATABASE visitantes;

# Crea un nuevo usuario llamado 'app_visitantes' con una contraseña
CREATE USER app_visitantes WITH PASSWORD '123456';

# Otorga permisos al usuario 'app_visitantes' para conectarse y usar la base de datos 'visitantes'
GRANT CONNECT ON DATABASE visitantes TO app_visitantes;
GRANT USAGE ON SCHEMA public TO app_visitantes;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_visitantes;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_visitantes;

# Sal de psql
\q