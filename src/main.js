import express from 'express';
import cors from 'cors';
import { initDb } from './db/index.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

// CORS: проверяет origin по массиву разрешённых адресов
app.use(cors({ origin: allowedOrigins }));

// Middleware-логгер: выводит метод, путь и время каждого запроса
app.use((req, _, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});

app.use(express.json());

// Rate-limit middleware: максимум 5 запросов с одного IP за 10 секунд
const requestCounts = new Map();

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 10_000;
  const maxRequests = 5;

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  // Удаляем запросы за пределами окна в 10 секунд
  const timestamps = requestCounts.get(ip).filter((t) => now - t < windowMs);
  requestCounts.set(ip, timestamps);

  if (timestamps.length >= maxRequests) {
    return res.status(429).json({ message: 'Слишком много запросов' });
  }

  timestamps.push(now);
  next();
});

// POST /echo — возвращает полученное JSON-тело обратно
app.post('/echo', (req, res) => {
  res.json(req.body);
});

// Middleware для проверки Authorization
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized: missing Authorization header' });
  }
  next();
}

// POST /admin — доступен только с Authorization
app.post('/admin', requireAuth, (_, res) => {
  res.json({ message: 'Admin access granted' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to the API' });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start database:', error);
    process.exit(1);
  });
