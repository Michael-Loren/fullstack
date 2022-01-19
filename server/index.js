const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

app.use((err, req, res, next) => {
  // use middleware to log error
  res.status(err.status || 500); // set status to err.status or 500
  res.json({
    // send json response
    error: {
      // create error object
      message: err.message, // set message to err.message
    },
  });
}); // end use
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  try {
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({
        error: "User not found",
      });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}); // get user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let errors = {};

    if (!emailValidation(email)) {
      errors.email = "Email is invalid";
    }
    if (!passwordValidation(password)) {
      errors.password = "Password is invalid";
    }

    const isEmailInUse = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (isEmailInUse.rows.length > 0) {
      errors.emailInUse = "Email is already in use";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}); // create user endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({
        error: {
          message: "Incorrect password",
        },
      });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}); // login user endpoint

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all todo

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo got deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
