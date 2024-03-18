import connection from '../db/connection.js';
import path from 'path';
import bcrypt from 'bcrypt'

const __dirname = path.resolve();

async function view(req, res) {
  connection.query("SELECT * FROM products", (err, rows) => {
    if (!err) {
      res.render('home', { rows })
    } else {
      throw err
    }
  })
}

async function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  connection.query("INSERT INTO users (name,password) VALUES (?,?)", [username, password], (err, res) => {
    if (err) {
      console.log("Can't insert data!")
    } else {
      console.log("New user registered!")
    }
  })
}

async function login(req, resp) {
  const name = req.body.name;
  const password = req.body.password;
  const sql = 'SELECT * FROM users WHERE name=?';
  connection.query(sql, [name, password], (err, res) => {
    if (err) {
      console.log("Can't get data from database!")
    } else {
      if (res.length == 0) {
        console.log("Incorrect name or password!")
      } else {
        bcrypt.compare(name.toString(), res[0].name, (err, response) => {
          if (err) {
            console.log("Can't compare!")
          }
          resp.render("home")
        })
      }
    }
  })
}

export default { view, login, register }
