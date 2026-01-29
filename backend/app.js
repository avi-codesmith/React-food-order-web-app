const fs = require("fs/promises");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  const customer = orderData.customer;

  if (
    !customer ||
    !customer.email ||
    !customer.email.includes("@") ||
    !customer.name ||
    customer.name.trim() === "" ||
    !customer.street ||
    customer.street.trim() === "" ||
    !customer["postal-code"] ||
    customer["postal-code"].trim() === "" ||
    !customer.city ||
    customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: Math.random().toString(),
  };

  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);

  allOrders.push(newOrder);

  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders, null, 2));

  res.status(201).json({ message: "Order created!" });
});

app.listen(3000);
