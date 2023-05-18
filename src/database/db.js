import sqlite3 from "sqlite3"

export const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  //   db.run(`CREATE TABLE IF NOT EXISTS users (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         name TEXT,
  //         email TEXT,
  //         password TEXT
  //     )`)
  //   const query = `
  //         INSERT INTO users (name, email, password) VALUES (?, ?, ?)
  //     `
  //   const values = ["John", "tugrp@example.com", "123456"]
  //   function insertUsersTable(error) {
  //     if (error) {
  //       console.log(error)
  //     }
  //     console.log("Usuaŕio cadastrado")
  //   }
  //   db.run(query, values, insertUsersTable)
  db.all(`SELECT * FROM users`, function (error, rows) {
    if (error) {
      console.log(error)
    }
    console.log("Lista de ususários", rows)
  })
})
