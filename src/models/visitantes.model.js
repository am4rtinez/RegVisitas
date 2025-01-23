import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from './database.model.js'

export const Visita = sequelize.define('visitantes', {
	id: {
		type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
	},
	identificador: {
		type: DataTypes.STRING(15),
		allowNull: false
	},
	nombre: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	apellidos: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	empresa: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	motivo: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	firma: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	fecha_llegada: {
		type: Sequelize.DATE,
  	defaultValue: Sequelize.NOW,
  	allowNull: false
	},
	fecha_salida: {
		type: DataTypes.DATE,
		allowNull: true
	}
},
{ createdAt: false,	updatedAt: false, freezeTableName: true })