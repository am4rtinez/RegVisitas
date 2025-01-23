import express from 'express'
import bodyParser from 'body-parser';
import pg from 'pg'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { PORT, NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from './config/config.js'
import routes from './routes/index.js'

const app = express()
const { Pool } = pg

// Settings
app.set('port', PORT)

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json());

if (NODE_ENV == 'development') {
	console.log('Development mode', NODE_ENV)
	app.use(morgan('dev'))
} else {
	console.log('Production mode', NODE_ENV)
	app.use(morgan('combined'))
}

// Define views and public files.
app.use(express.static('public'))
app.set('views', path.join(process.cwd(), "src/views"))
app.set('view engine', 'ejs')
app.set('trust proxy', true)

// Configuración de la conexión a la base de datos
// const pool = new Pool({
//     user: DB_USER, // Usuario de la base de datos
//     host: DB_HOST,      // Dirección del servidor de la base de datos (generalmente localhost)
//     database: DB_NAME, // Nombre de la base de datos
//     password: 'pruebas', // Contraseña del usuario
//     port: DB_PORT,             // Puerto de PostgreSQL (por defecto 5432)
// });

// Rutas
app.use('/', routes)

// app.get('/visitas', async (req, res) => {
// 	try {
// 			const client = await pool.connect();

// 			let query = "SELECT identificador, nombre, apellidos, empresa, motivo, fecha_llegada, fecha_salida FROM visitantes ORDER BY fecha_llegada DESC LIMIT 100";
// 			let queryParams = [];

// 			if (req.query.fechaInicio && req.query.fechaFin) {
// 					query = "SELECT identificador, nombre, apellidos, empresa, motivo, fecha_llegada, fecha_salida FROM visitantes WHERE fecha_llegada::date BETWEEN $1 AND $2 ORDER BY fecha_llegada DESC";
// 					queryParams.push(req.query.fechaInicio);
// 					queryParams.push(req.query.fechaFin);
// 			} else if (req.query.fechaInicio) {
// 				query = "SELECT identificador, nombre, apellidos, empresa, motivo, fecha_llegada, fecha_salida FROM visitantes WHERE fecha_llegada::date >= $1 ORDER BY fecha_llegada DESC";
// 				queryParams.push(req.query.fechaInicio);
// 			}else if (req.query.fechaFin) {
// 				query = "SELECT identificador, nombre, apellidos, empresa, motivo, fecha_llegada, fecha_salida FROM visitantes WHERE fecha_llegada::date <= $1 ORDER BY fecha_llegada DESC";
// 				queryParams.push(req.query.fechaFin);
// 			}

// 			const result = await client.query(query, queryParams);
// 			const visitas = result.rows;
// 			console.log(visitas)
// 			client.release();

// 			res.json(visitas);
// 	} catch (error) {
// 			console.error("Error al obtener las visitas:", error);
// 			res.status(500).json({ error: 'Error al obtener las visitas' });
// 	}
// });

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

// Manejo de la desconexión del pool (importante para evitar fugas de conexión)
// process.on('SIGINT', async () => {
// 	console.log('Cerrando el pool de conexiones...');
// 	await pool.end();
// 	console.log('Pool de conexiones cerrado.');
// 	process.exit(0);
// });

// Server initialization
app.listen(app.set('port'), '0.0.0.0', () => {
	console.log(`Servidor ejecutandose en http://localhost:${app.set('port')}`)
})