const app = require('./app')

require('dotenv').config()

const db = {
    user : process.env.DB_USER,
    passeword : process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

}
