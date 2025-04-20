const express = require("express");
const morgan = require("morgan");
const {
  client,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  createFavorite,
  fetchFavorites,
  destroyFavorite,
} = require("./db");

const server = express();
client.connect();

server.use(express.json());
server.use(morgan("dev"));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server listening on port ${port}`));

server.get("/api/users", async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

server.get("/api/products", async (req, res, next) => {
  try {
    const products = await fetchProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

server.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const favorites = await fetchFavorites(req.params.id);
    res.send(favorites);
  } catch (error) {
    next(error);
  }
});

server.post("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const favorite = await createFavorite(req.body.product_id, req.params.id);
    res.status(201).send(favorite);
  } catch (error) {
    next(error);
  }
});

server.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
  try {
    await destroyFavorite(req.params.id, req.params.userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


