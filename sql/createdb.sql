# Conéctate al servidor PostgreSQL como el usuario postgres (o un usuario con privilegios de creación de bases de datos)

# Crea una nueva base de datos llamada 'regvisitas'
CREATE DATABASE regvisitas;

# Crea un nuevo usuario llamado 'amartinez' con una contraseña
CREATE USER amartinez WITH PASSWORD '123456';

# Otorga permisos al usuario 'amartinez' para conectarse y usar la base de datos 'regvisitas'
GRANT CONNECT ON DATABASE regvisitas TO amartinez;
GRANT USAGE ON SCHEMA public TO amartinez;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO amartinez;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO amartinez;

CREATE TABLE IF NOT EXISTS visitantes (
			id SERIAL PRIMARY KEY,
			identificador VARCHAR(15) NOT NULL,
			nombre VARCHAR(255) NOT NULL,
			apellidos VARCHAR(255) NOT NULL,
			empresa VARCHAR(255),
			motivo TEXT,
			firma TEXT, -- Almacena la firma en formato base64
			fecha_llegada TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			fecha_salida TIMESTAMP WITH TIME ZONE
	);

# Sal de psql
\q