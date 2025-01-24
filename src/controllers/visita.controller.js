import { Visita } from '../models/visitantes.model.js'

export const createVisita = async ( req, res, next) => {
	let visita = await Visita.create({
		identificador: req.body.identificador,
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		empresa: req.body.empresa,
		motivo: req.body.motivo,
		firma: req.body.firma
	}).then(function(visita){
		res.status(200).json({ message: 'Se ha registrado la entrada.'});
	}).catch(function(error){
		res.status(500).json({ message: 'Error al registrar la entrada.', error: `${error.message}`})
	})
	next()
}