import { config } from "dotenv";

config()

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000

// DB Config
export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.DB_NAME
export const DB_PORT = process.env.DB_PORT
export const DB_USER = process.env.DB_USER
export const DB_PASS = process.env.DB_PASSWORD
export const DB_DIALECT =  process.env.DB_DIALECT
export const DB_POOL = {
	max: 5,							// max: maximum number of connection in pool
	min: 0,							// min: minimum number of connection in pool
	acquire: 30000,			// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
	idle: 10000					// idle: maximum time, in milliseconds, that a connection can be idle before being released
}