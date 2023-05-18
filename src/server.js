import express from "express"
import { db } from "./database/db.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/saved", (req, res) => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
    )`)

  const query = `
        INSERT INTO users (name, email, password) VALUES (?, ?, ?)
    `
  const values = [req.body.name, req.body.email, req.body.password]

  function insertUsersTable(error) {
    if (error) {
      console.log(error)
    }
    console.log("Usuaŕio cadastrado")
    res.render("savedUser", { saved: true })
  }

  db.run(query, values, insertUsersTable)
})

app.listen(3000)
console.log("Servidor rodando...")
