import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
dotenv.config();
const { Pool } = pg;
const PORT = 3000;
const app = express();
const saltRounds = 10;

//MIDDLEWARES
app.use(
  session({
    secret: "TATAKAE",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60 * 60,
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//DataBase Connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//AUTH
//register
app.post("/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("error in hashing", err);
      } else {
        const results = await pool.query(
          "INSERT INTO users(fullname,email,password) VALUES ($1,$2,$3) RETURNING *",
          [fullName, email, hash]
        );
        const user = results.rows[0];
        req.login(user, (err) => {
          console.log("success,user:", user);
          res.status(201).json({
            id: user.id,
            username: user.fullname,
            email: user.email,
          });
        });
      }
    });
  } catch (err) {
    console.log("catch err in register", err);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    if (results.rows.length > 0) {
      const user = results.rows[0];
      const data = user.password;
      console.log(data);
      bcrypt.compare(password, data, (err, valid) => {
        if (err) {
          console.error("Error in comparing password", err);
        } else {
          if (valid) {
            console.log("user bro", user);
            res.status(201).json({
              id: user.id,
              username: user.fullname,
              email: user.email,
              admin: user.admin,
            });
          } else {
            res.status(400).json({ message: "Invalid username or password" });
          }
        }
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.log("error in login", err);
  }
});

passport.js;
passport.use(
  new Strategy("local", async (email, password, cb) => {
    try {
      const results = await pool.query("SELECT * FROM users WHERE email =$1", [
        email,
      ]);
      if (results.rows.length > 0) {
        const user = results.rows[0];
        const storedHashedPassword = user.password;
        console.log("password", password);
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error in comparing password", err);
            return cb(err);
          } else {
            if (valid) {
              console.log("user bro", user);
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User Not Found");
      }
    } catch (err) {
      console.log("err in passport.use", err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ message: "success" });
  });
});

//PRODUCTS

//get all products
app.get("/api/products", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});
//get all orders
app.get("/api/products/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM orders WHERE user_id=$1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});
//get all banner
app.get("/api/products/banner", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM banner");
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
//get all cart items
app.get("/api/products/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM cart WHERE cart_id=$1", [
      id,
    ]);
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

//create a orders
app.post("/api/products/orders", async (req, res) => {
  try {
    console.log(req.body);
    const {
      user_id,
      product_id,
      customer_name,
      total_amount,
      shipping_address,
      payment_method,
    } = req.body;
    const order_date = new Date();
    const results = await pool.query(
      "INSERT INTO orders (user_id, product_id, customer_name, order_date, total_amount,shipping_address, payment_method) VALUES ($1, $2,$3, $4,$5,$6,$7) RETURNING *",
      [
        user_id,
        product_id,
        customer_name,
        order_date,
        total_amount,
        shipping_address,
        payment_method,
      ]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});
//create a products
app.post("/api/products", async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, price, stock, category, image } = req.body;
    const results = await pool.query(
      "INSERT INTO products (name,description,price,stock,category,idcategory,image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        name,
        description,
        price,
        stock,
        category,
        category.split(" ").join("-").split("'").join("").toLowerCase(),
        image,
      ]
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
    const { name, type, image } = req.body;
    const results = await pool.query(
      "INSERT INTO category (name,type,idname,image) VALUES ($1,$2,$3,$4) RETURNING *",
      [
        name,
        type,
        name.split(" ").join("-").split("'").join("").toLowerCase(),
        image,
      ]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});
//create and add cart item
app.post("/api/products/cart", async (req, res) => {
  try {
    console.log(req.body);
    const { id, productId, quantity } = req.body;
    const results = await pool.query(
      "INSERT INTO cart (cart_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *",
      [id, productId, quantity]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});

//updating a products
app.put("/api/products/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { name, description, price, stock, category, image } = req.body;
    const results = await pool.query(
      "UPDATE products SET name=$1,description = $2,price=$3,stock=$4,category=$5,image=$6 WHERE id=$7 RETURNING *",
      [name, description, price, stock, category, image, id]
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
//updating a cart
app.put("/api/products/cart/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { operation } = req.body;
    if (operation === "increase") {
      const results = await pool.query(
        "UPDATE cart SET quantity=quantity + 1 WHERE id=$1 RETURNING *",
        [id]
      );
      if (results.rows.length > 0) {
        res.status(201).json(results.rows[0]);
      } else {
        res.status(404).json("product not found");
      }
    } else if (operation === "decrease") {
      const results = await pool.query(
        "UPDATE cart SET quantity=quantity - 1 WHERE id=$1 RETURNING *",
        [id]
      );
      if (results.rows.length > 0) {
        res.status(201).json(results.rows[0]);
      } else {
        res.status(404).json("product not found");
      }
    }
  } catch (err) {
    res.status(404).json("Error in updating products");
  }
});
//updating a banner
app.put("/api/products/banner/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { name, image } = req.body;
    const results = await pool.query(
      "UPDATE banner SET name=$1,image=$2 WHERE id=$3 RETURNING *",
      [name, image, id]
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
app.delete("/api/products/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM orders WHERE order_id=$1 RETURNING *",
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
app.delete("/api/products/cart/:cart_id/:product_id", async (req, res) => {
  try {
    const { cart_id, product_id } = req.params;
    const results = await pool.query(
      "DELETE FROM cart WHERE cart_id=$1 AND product_id=$2 RETURNING *",
      [cart_id, product_id]
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
