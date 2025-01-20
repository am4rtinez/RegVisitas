// import express from 'express'
// import path from 'path'
// import cors from 'cors'
// import morgan from 'morgan'

// const app = express()

//Middlewares
// app.use(cors())
// app.use(express.json())
// app.use(express.text())
// app.use(express.urlencoded({ extended: true}))

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path'); // Importa el módulo path

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'

// Configura el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Establece el directorio de las vistas



// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'amartinez', // Usuario de la base de datos
    host: 'localhost',      // Dirección del servidor de la base de datos (generalmente localhost)
    database: 'regvisitantes', // Nombre de la base de datos
    password: '123456', // Contraseña del usuario
    port: 5432,             // Puerto de PostgreSQL (por defecto 5432)
});

// Modificar la creación de la tabla
pool.query(`
	CREATE TABLE IF NOT EXISTS visitantes (
			id SERIAL PRIMARY KEY,
			identificador VARCHAR(255) NOT NULL,
			nombre VARCHAR(255) NOT NULL,
			apellidos VARCHAR(255) NOT NULL,
			empresa VARCHAR(255),
			motivo TEXT,
			firma TEXT, -- Almacena la firma en formato base64
			fecha_llegada TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			fecha_salida TIMESTAMP WITH TIME ZONE
	);
`, (err, res) => {
	if (err) {
			console.error("Error al crear la tabla:", err);
	}
});

// Rutas
app.get('/', (req, res) => {
	// res.redirect('/entrada'); // Redirige a /entrada por defecto
	res.render('index', { title: 'Registro de Visitantes' });
});

app.get('/entrada', (req, res) => {
	res.render('entrada', { title: 'Registro de Entrada' });
});

app.get('/salida', (req, res) => {
	res.render('salida', { title: 'Registro de Salida' });
});


app.post('/registrar', (req, res) => {
	const { identificador, nombre, apellidos, empresa, motivo, firma } = req.body;

	pool.query(
			'INSERT INTO visitantes (identificador, nombre, apellidos, empresa, motivo, firma) VALUES ($1, $2, $3, $4, $5, $6)',
			[identificador, nombre, apellidos, empresa, motivo, firma],
			(err, result) => {
					if (err) {
							console.error('Error al insertar en la base de datos:', err);
							res.status(500).json({ mensaje: 'Error al registrar la visita.' });
					} else {
							res.json({ mensaje: 'Visita registrada correctamente.' });
					}
			}
	);
});

app.post('/registrarSalida', (req, res) => {
	const { identificador } = req.body;

	pool.query(
			'UPDATE visitantes SET fecha_salida = CURRENT_TIMESTAMP WHERE identificador = $1 AND fecha_salida IS NULL', // Actualiza solo si no tiene fecha de salida
			[identificador],
			(err, result) => {
					if (err) {
							console.error('Error al registrar la salida:', err);
							return res.status(500).json({ mensaje: 'Error al registrar la salida.' });
					}

					if (result.rowCount === 0) {
							return res.status(404).json({ mensaje: 'No se encontró un visitante con ese identificador o ya se registró su salida.' });
					}

					res.json({ mensaje: 'Salida registrada correctamente.' });
			}
	);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});