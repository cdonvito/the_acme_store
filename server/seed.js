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

  const [craig, madie, scooby, zebraCake, dotPretz, pumpkin, chicken] = await Promise.all([
    createUser("Craig", "password123"),
    createUser("Madie", "anotherpassword"),
    createUser("Scooby", "testpassword"),
    createProduct("Zebra Cakes"),
    createProduct("Dot's Pretzels"),
    createProduct("Pumpkin"),
    createProduct("Chicken"),
  ]);

  console.log("users created");
  console.log(await fetchUsers());

  console.log("products created");
  console.log(await fetchProducts());

  const [Favorite_Product] = await Promise.all([
    createFavorite(zebraCake.id, craig.id),
    createFavorite(dotPretz.id, madie.id),
    createFavorite(pumpkin.id, scooby.id),
  ]);

  const [Favorite_Product1] = await Promise.all([
    createFavorite(chicken.id, craig.id)
  ]);

  console.log("favorites created");
  console.log(await fetchFavorites(craig.id));

  await destroyFavorite(Favorite_Product1.id, craig.id);

  console.log("after deleting favorite");
  console.log(await fetchFavorites(craig.id));

  await client.end();
};

seed();