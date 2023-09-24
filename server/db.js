const Pool = require('pg').Pool


const pool = new Pool({
  user:'postgresuser',
  password: 'oXjW267eNTnQTrsohCcf1huz5pC58vDZ',
  host: 'dpg-ck82g9nsasqs73cogfo0-a.frankfurt-postgres.render.com',
  port: 5432,
  database: 'postres_12oc'
})

module.exports = pool