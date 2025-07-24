import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host: 'pld112.truehost.cloud',   // ✅ Truehost SQL host
  user: 'aptqnliv',
  password: 'hG-4bpP8m8.8YY',
  database: 'aptqnliv_fame_distribution',
})
