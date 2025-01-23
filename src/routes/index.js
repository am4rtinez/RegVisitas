import { Router } from 'express'
import { createVisita } from '../controllers/visita.controller.js'

const router = Router()

// Index
router.get('/', (req, res) => {
	// res.render('pages/index', { 'title': 'Envío SMS SEIB112' });
	res.render('pages/index', { title: 'Registro de Personal Externo al SEIB112' })
})

router.get('/entrada', (req, res) => {
	res.render('pages/entrada', { title: 'Registrar Entrada' });
	// renderEntradaForm (req, res)
});

router.get('/salida', (req, res) => {
	res.render('pages/salida', { title: 'Registro Salida' });
});

router.get('/visitantes', (req, res) => {
	res.render('pages/visitas', { title: 'Últimos registros' });
});

// Modificar el endpoint por entrada.
router.post('/registrar', createVisita)

router.post('/registrarSalida') //hay que registrar la salida.

function renderFormulario (req,res) {
	// res.render('pages/entrada', { title: 'Registro de Entrada' });
}

function renderEntradaForm (req, res) {
	res.render('pages/form', {
		title: "Registro de Entrada", //page title
		idform: "registroForm",
		action: "/registrar", //post action for the form
		script: "/js/scriptEntrada.js",
		result: req.result
	});
}

function renderForm (req, res) {
	res.render('pages/entrada', { title: 'Registro de Entrada' })
}

// router.post('/registrar', (req, res) => {
	// const { identificador, nombre, apellidos, empresa, motivo, firma } = req.body;

	// pool.query(
	// 		'INSERT INTO visitantes (identificador, nombre, apellidos, empresa, motivo, firma) VALUES ($1, $2, $3, $4, $5, $6)',
	// 		[identificador, nombre, apellidos, empresa, motivo, firma],
	// 		(err, result) => {
	// 				if (err) {
	// 						console.error('Error al insertar en la base de datos:', err);
	// 						res.status(500).json({ mensaje: 'Error al registrar la visita.' });
	// 				} else {
	// 						res.json({ mensaje: 'Visita registrada correctamente.' });
	// 				}
	// 		}
	// );

// });

export default router