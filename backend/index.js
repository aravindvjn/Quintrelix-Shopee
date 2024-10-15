import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

const PgSession = connectPgSimple(session);

dotenv.config();
const { Pool } = pg;
const PORT = process.env.PORT || 3000;
const app = express();
const saltRounds = 10;

//DataBase Connection
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// DATABASE CONNECTION
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("Connected to Neon PostgreSQL database!"))
  .catch((err) => console.error("Connection error", err.stack));

// MIDDLEWARES
// const isAdmin = (req, res, next) => {
//   if (req.isAuthenticated() && req.user.admin) {
//     next();
//   } else {
//     console.log("not the admin");
//     res.send(404).json({ msg: "Unauthorized page" });
//   }
// };

app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  })
);

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Hello from the Node.js API!");
});

// AUTH ROUTES

// Register
app.post("/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password", err });
      }

      const results = await pool.query(
        "INSERT INTO users(fullname,email,password) VALUES ($1,$2,$3) RETURNING *",
        [fullName, email, hash]
      );
      const user = results.rows[0];

      // Log in the user after registration
      req.login(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Login failed after registration", err });
        }
        res.status(201).json({
          id: user.id,
          username: user.fullname,
          email: user.email,
        });
      });
    });
  } catch (err) {
    console.log("Error in register:", err);
    res.status(500).json({ message: "Registration failed", err });
  }
});

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "User Not Found" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.status(200).json({
        id: user.id,
        username: user.fullname,
        email: user.email,
        admin: user.admin,
      });
    });
  })(req, res, next);
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", err });
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
});

// PASSPORT STRATEGY
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log("The email is", email);
        const results = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (results.rows.length === 0) {
          return done(null, false, { message: "User not found" });
        }

        const user = results.rows[0];
        const storedHashedPassword = user.password;

        // Compare password
        bcrypt.compare(password, storedHashedPassword, (err, isValid) => {
          if (err) {
            console.log("err");
            return done(err);
          }
          if (!isValid) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// SERIALIZE USER
passport.serializeUser((user, done) => {
  console.log("The serialize User", user);
  done(null, user.id);
});

// DESERIALIZE USER
passport.deserializeUser(async (id, done) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (results.rows.length === 0) {
      return done(new Error("User not found"));
    }
    const user = results.rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//Get user Data
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      username: req.user.fullname,
      email: req.user.email,
      admin: req.user.admin,
    });
  } else {
    res.json(false);
  }
});

app.get("/api/user-data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT email,fullname FROM users WHERE id=$1",
      [id]
    );
    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});

app.put("/api/user-name-edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname } = req.body;
    const results = await pool.query(
      "UPDATE users SET fullname=$1 WHERE id=$2 RETURNING *",
      [fullname, id]
    );
    if (results.rows.length > 0) {
      res.status(201).json(results.rows[0]);
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(404).json("Error in updating username");
  }
});
//Change Password
app.put("/api/user-pass-edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newPass, oldPass } = req.body;

    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (results.rows.length > 0) {
      const user = results.rows[0];
      const data = user.password;
      bcrypt.compare(oldPass, data, (err, valid) => {
        if (err) {
          console.error("Error in comparing password", err);
        } else {
          if (valid) {
            console.log("user bro", user);
            bcrypt.hash(newPass, saltRounds, async (err, hash) => {
              if (err) {
                console.log("error in hashing", err);
              } else {
                const results = await pool.query(
                  "UPDATE users SET password=$1 WHERE id=$2 RETURNING *",
                  [hash, id]
                );
                if (results.rows.length > 0) {
                  res.status(201).json({ message: "success" });
                } else {
                  res.status(404).json("Failed");
                }
              }
            });
          } else {
            res.status(400).json({ message: "Invalid password" });
          }
        }
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(404).json("Error in updating username");
  }
});

//PRODUCTS

//get all products
app.get("/api/products", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});

//get all orders
app.get("/api/products/orders/all", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM orders");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});
//get all orders by user
app.get("/api/products/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC;",
      [id]
    );
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
//get all phone ad
app.get("/api/advertisement", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM phonead");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});
//get all user address
app.get("/api/user/address/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const results = await pool.query(
      "SELECT * FROM addresses WHERE user_id=$1",
      [user_id]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(404).json("Error in getting all products");
  }
});

//get user address by id
app.get("/api/user/address/:user_id/:id", async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const results = await pool.query(
      "SELECT * FROM addresses WHERE user_id=$1 AND id=$2",
      [user_id, id]
    );
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
      "SELECT * FROM products WHERE idcategory = $1 ORDER BY id DESC",
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
//create an address
app.post("/api/user/address", async (req, res) => {
  try {
    const {
      user_id,
      name,
      address,
      state,
      country,
      postal_code,
      phone_number,
    } = req.body;
    const results = await pool.query(
      "INSERT INTO addresses (user_id,name,address,state,country,postal_code,phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [user_id, name, address, state, country, postal_code, phone_number]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(404).json("Error in creating products");
  }
});
//create a products
app.post("/api/products",async (req, res) => {
  try {
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

//updating advertisement
app.put("/api/advertisement/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, heading, subheading, buylink, learnmore, image } = req.body;
    const results = await pool.query(
      " UPDATE phonead SET name = $1, heading = $2, subheading = $3, buylink =$4, learnmore =$5, image = $6 WHERE id = $7 RETURNING *",
      [name, heading, subheading, buylink, learnmore, image, id]
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
//updating a products
app.put("/api/products/:id", async (req, res) => {
  try {
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

//updating an address
app.put("/api/user/address/:id", async (req, res) => {
  try {
    const {
      user_id,
      name,
      address,
      state,
      country,
      postal_code,
      phone_number,
    } = req.body;
    const { id } = req.params;
    const results = await pool.query(
      "UPDATE addresses SET phone_number=$1,name=$2,address=$3,state=$4,country=$5,postal_code=$6 WHERE id=$7 AND user_id=$8 RETURNING *",
      [phone_number, name, address, state, country, postal_code, id, user_id]
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

//DELETING

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

// Deleting an address
app.delete("/api/user/address/:id", async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;
    const results = await pool.query(
      "DELETE FROM addresses WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, user_id]
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

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
