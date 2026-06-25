/**
 * AD2BS - Nepali Date Converter API Server
 * Domain: ad2bs.prasiddha.top
 * Stack: Node.js + Express + sql.js (SQLite)
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { getDB } = require('./db/database');
const { seedDatabase } = require('./db/seed');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: NODE_ENV === 'production'
    ? ['https://ad2bs.prasiddha.top', 'https://www.ad2bs.prasiddha.top']
    : '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── Start Server after DB init ──────────────────────────────────────────────
async function startServer() {
  try {
    // Initialize database and seed
    await getDB();
    await seedDatabase();

    // Import routes AFTER DB is ready
    const convertRoutes = require('./routes/convert');
    const calendarRoutes = require('./routes/calendar');

    // ─── Routes ──────────────────────────────────────────────────────────────
    app.use('/api/convert', convertRoutes);
    app.use('/api/calendar', calendarRoutes);

    app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        service: 'AD2BS Nepali Date Converter API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        environment: NODE_ENV,
        supportedRange: 'BS 1970–2100 / AD 1913–2043'
      });
    });

    app.get('/api', (req, res) => {
      res.json({
        name: 'AD2BS Nepali Date Converter API',
        version: '1.0.0',
        endpoints: {
          'GET /api/convert/ad-to-bs?year=&month=&day=': 'Convert AD to BS',
          'GET /api/convert/bs-to-ad?year=&month=&day=': 'Convert BS to AD',
          'GET /api/convert/today': 'Get today in both calendars',
          'GET /api/calendar/:year/:month': 'Get BS month calendar',
          'GET /api/calendar/meta/years': 'Get supported year range',
          'GET /api/health': 'Health check'
        }
      });
    });

    // Production: serve React build
    if (NODE_ENV === 'production') {
      const distPath = path.join(__dirname, '../frontend/dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: 'Endpoint not found' });
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error('Server Error:', err);
      res.status(500).json({ error: 'Internal server error', message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`\n🚀 AD2BS API running on http://localhost:${PORT}`);
      console.log(`📅 Environment: ${NODE_ENV}`);
      console.log(`🔗 Test: http://localhost:${PORT}/api/convert/today`);
      console.log(`🔗 Test: http://localhost:${PORT}/api/convert/ad-to-bs?year=2026&month=6&day=25\n`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
module.exports = app;
