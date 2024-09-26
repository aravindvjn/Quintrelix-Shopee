import express from "express";
import pg from "pg";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//get all products
app.get("/api/products", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});

//get all category group
app.get("/api/products/category", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM category");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});

//get product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM products WHERE id= $1", [
      id,
    ]);
    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]);
    } else {
      res.status(404).json("product not found");
    }
  } catch (err) {
    res.status(404).json("Error in getting product by id", err);
  }
});

//get product by category
app.get("/api/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const results = await pool.query(
      "SELECT * FROM products WHERE idcategory = $1",
      [category]
    );
    res.json(results.rows);
  } catch (err0) {
    res.status(404).json({
      message: err.message,
    });
  }
});

//create a products
app.post("/api/products", async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, price, stock, category,image } = req.body;
    const results = await pool.query(
      "INSERT INTO products (name,description,price,stock,category,idcategory,image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [name, description, price, stock, category,category.split(' ').join('-').split("'").join('').toLowerCase(),image]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});

//create a category group
app.post("/api/products/category", async (req, res) => {
  try {
    console.log(req.body);
    const { name,type,image} = req.body;
    const results = await pool.query(
      "INSERT INTO category (name,type,idname,image) VALUES ($1,$2,$3,$4) RETURNING *",
      [name,type,name.split(' ').join('-').split("'").join('').toLowerCase(),image]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});


//updating a products
app.put("/api/products/:id", async (req, res) => {
  try {
      console.log(req.body)
    const { id } = req.params;
    const { name, description, price, stock, category,image } = req.body;
    const results = await pool.query(
      "UPDATE products SET name=$1,description = $2,price=$3,stock=$4,category=$5,image=$6 WHERE id=$7 RETURNING *",
      [name, description, price, stock, category,image, id]
    );
    if (results.rows.length > 0) {
      res.status(201).json(results.rows[0]);
    } else {
      res.status(404).json("product not found");
    }
  } catch (err) {
    res.status(404).json("Error in updating products");
  }
});

// Deleting a products
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    if (results.rows.length > 0) {
      res.json("product deleted");
    } else {
      res.status(404).json("product not found");
    }
  } catch (err) {
    res.status(404).json("Error in deleting a product");
  }
});
// Deleting a category group
app.delete("/api/products/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM category WHERE id=$1 RETURNING *",
      [id]
    );
    if (results.rows.length > 0) {
      res.json("category deleted");
    } else {
      res.status(404).json("category not found");
    }
  } catch (err) {
    res.status(404).json("Error in deleting a category");
  }
});

app.post("/api/add-product", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
