import express from 'express'
// import bodyParser from 'body-parser';
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { PORT, NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } from './config/config.js'
import routes from './routes/index.js'

const app = express()

// Settings
app.set('port', PORT)

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true}))
// app.use(bodyParser.json());

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

app.use('/css', express.static(path.join(process.cwd(), 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(process.cwd(), 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(process.cwd(), 'node_modules/jquery/dist')))

// Rutas
app.use('/', routes)

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