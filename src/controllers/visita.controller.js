import { Visita } from '../models/visitantes.model.js'

export const createVisita = async ( req, res, next) => {
	const visita = await Visita.create({
		identificador: req.body.identificador,
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		empresa: req.body.empresa,
		motivo: req.body.motivo,
		firma: req.body.firma
	}).then(function(visita){
	}).catch(function(error){
		console.log(error)
		return {
			status: 'error',
			error: 'DB Error',
			message: `${error.message}`,
		}
	})
	next()
}