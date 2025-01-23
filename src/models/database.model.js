import { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_DIALECT, DB_POOL } from '../config/config.js'

import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    host: DB_HOST,
    dialect: DB_DIALECT, 
    pool: DB_POOL,
		timezone:"+02:00"
  }
)