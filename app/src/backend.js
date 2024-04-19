var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/products", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("fakestore_catalog").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/products/:id", async (req, res) => {
  const productid = Number(req.params.id);
  console.log("Product to find :", productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productid };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) {
    console.log("status " + 404);
    res.send("Not Found").status(404);
  } else {
    console.log("status " + 200);
    res.send(results).status(200);
  }
});

app.post("/products", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(req.body.imageUrl)) {
        console.log("Not a URL");
      }

    const newDocument = {
      id: parseInt(req.body.id),
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      rating: {
        rate: parseFloat(req.body.rate),
        count: parseInt(req.body.count),
      },
    };
    console.log(newDocument);

    const results = await db.collection("fakestore_catalog").insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Product to delete :", id);
    const query = { id: id };
    // read data from product to delete to send it to frontend
    const productDeleted = await db.collection("fakestore_catalog").findOne(query);
    // Check if product to delete exists
    if (!productDeleted) {
      return res.status(404).send({ message: "Product not found" });
    }

    // delete
    const results = await db.collection("fakestore_catalog").deleteOne(query);
    res.status(200);
    res.send(productDeleted);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Product to update :", id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      price: req.body.price,
    },
  };
  // read data from product to update to send to frontend
  const productUpdated = await db.collection("fakestore_catalog").findOne(query);
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = {};
  const results = await db
    .collection("fakestore_catalog")
    .updateOne(query, updateData, options);
  // If no document was found to update, you can choose to handle it by sending a 404 response
  if (results.matchedCount === 0) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.status(200);
  res.send(productUpdated);
});
