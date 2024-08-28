#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

const client = createClient();
const app = express();
const PORT = 1245;

// Promisify Redis commands
const setAsync = promisify(client.SET).bind(client);
const getAsync = promisify(client.GET).bind(client);

// Retrieve item by ID
const getItemById = (id) => listProducts.find(item => item.itemId === id);

// Reserve stock for an item
const reserveStockById = async (itemId, stock) => setAsync(`item.${itemId}`, stock);

// Get current reserved stock for an item
const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return parseInt(stock, 10) || 0;
};

// List all products
app.get('/list_products', (_, res) => {
  res.status(200).json(listProducts);
});

// Get details of a specific product
app.get('/list_products/:itemId(\\d+)', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const productItem = getItemById(itemId);

  if (!productItem) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;

  res.status(200).json(productItem);
});

// Reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const productItem = getItemById(itemId);

  if (!productItem) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const availableStock = productItem.initialAvailableQuantity - reservedStock;

  if (availableStock < 1) {
    return res.status(404).json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, reservedStock + 1);
  res.status(200).json({ status: 'Reservation confirmed', itemId });
});

// Reset product stock to zero
const resetProductsStock = async () => {
  await Promise.all(
    listProducts.map(item => setAsync(`item.${item.itemId}`, 0))
  );
};

// Start the server
app.listen(PORT, async () => {
  await resetProductsStock();
  console.log(`API available on localhost port ${PORT}`);
});

export default app;
