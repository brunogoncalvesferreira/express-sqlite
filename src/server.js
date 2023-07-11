import express from "express"
import { db } from "./database/db.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/editar", (req, res) => {
  res.render("edits")
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
    console.log("Usuário cadastrado")
    res.render("savedUser", { saved: true })
  }

  db.run(query, values, insertUsersTable)
})

app.post("/edit", (req, res) => {
  const { id, name, email, password } = req.body

  db.run(
    `UPDATE users SET name =?, email =?, password =? WHERE id =?`,
    [name, email, password, id],
    function (error) {
      if (error) {
        return console.error(error.message)
      }
      res.render("okEdit")
      console.log(`Dados atualizados para: ${name}, ${email}, ${password}`)
    }
  )
})

app.get('/saved', (req, res) => {
  db.all(`SELECT id, name, email, password FROM users`, (error, rows) => {
    if(error) {
      console.log(error)
    } else {
      res.json(rows)
    }
  })
})

app.listen(3000)
console.log("Servidor rodando...")
