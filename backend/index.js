const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql");
const e = require("express");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
console.log(PORT);
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_URL,
  multipleStatements: true,
  connectTimeout: 10000,
});

// Event listener for new connections
pool.on("connection", function (_conn) {
  if (_conn) {
    console.log(`Connected to the database via threadId ${_conn.threadId}!!`);
    _conn.query("SET SESSION auto_increment_increment=1");
  }
});

async function createTableIfNoteExist() {
  pool.getConnection((err, con) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        msg: `Something went wrong ${err}`,
      });
    }
    const query = `CREATE TABLE IF NOT EXISTS testingmovie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500),
  year VARCHAR(10),
  content VARCHAR(1000),
  type VARCHAR(255),
  poster VARCHAR(2000)
);`;
    con.query(query, (err, result) => {
      if (err) {
        con.release();
        return;
      }
    });
  });
}
// createTableIfNoteExist();

app.post("/api/v1/add-movie", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        msg: `Something went wrong ${err}`,
      });
    }
    const { title, year, content, type,poster } = req.body;
    const query = `INSERT INTO testingmovie(title,year,content,type,poster) values(?,?,?,?,?)`;
    con.query(query, [title, year, content, type,poster], (err, result) => {
      con.release(); // Release the connection back to the pool
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Something went wrong related with database",
        });
      }
      return res.status(200).json({
        msg: "Move add successfully",
        data: result,
      });
    });
  });
});
app.get("/api/v1/get-all-items", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        msg: `Something went wrong ${err}`,
      });
    }
    const query = `SELECT * FROM testingmovie;`;
    con.query(query, (err, result) => {
      con.release(); // Release the connection back to the pool
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Something went wrong related with database",
        });
      }
      return res.status(200).json({
        msg: "Move Get successfully",
        data: result,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send(`<h1>Server running at port=====> ${PORT}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
