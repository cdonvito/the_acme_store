const {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  createFavorite,
  fetchFavorites,
  destroyFavorite,
} = require("./db");

const seed = async () => {
  await client.connect();

  await createTables();
  console.log("tables created");

  const [craig, madie, scooby, zebraCake, dotPretz, pumpkin] = await Promise.all([
    createUser("Craig", "password123"),
    createUser("Madie", "anotherpassword"),
    createUser("Scooby", "testpassword"),
    createProduct("Zebra Cakes"),
    createProduct("Dot's Pretzels"),
    createProduct("Pumpkin"),
  ]);

  console.log("users created");
  console.log(await fetchUsers());

  console.log("products created");
  console.log(await fetchProducts());

  const [Favorite_Product] = await Promise.all([
    createFavorite(craig.id, zebraCake.id),
    createFavorite(madie.id, dotPretz.id),
    createFavorite(scooby.id, pumpkin.id),
  ]);

  console.log("favorites created");
  console.log(await fetchFavorites(craig.id));

  await destroyFavorite(Favorite_Product.id, madie.id);

  console.log("after deleting favorite");
  console.log(await fetchFavorites(madie.id));

  await client.end();
};

seed();