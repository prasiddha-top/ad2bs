# AD2BS — Nepali Date Converter

[![GitHub](https://img.shields.io/badge/GitHub-prasiddha--top%2Fad2bs-blue)](https://github.com/prasiddha-top/ad2bs)
[![Website](https://img.shields.io/badge/Website-ad2bs.prasiddha.top-crimson)](https://ad2bs.prasiddha.top)

## 🗓️ Convert AD ↔ BS | Gregorian ↔ Bikram Sambat

**Live Site:** [ad2bs.prasiddha.top](https://ad2bs.prasiddha.top)

Nepal's most accurate and comprehensive date converter between **AD (Anno Domini / Gregorian)** and **BS (Bikram Sambat / Nepali)** calendar systems.

---

## ✨ Features

- ⚡ **Instant conversion** — AD → BS and BS → AD
- 📅 **Today's date** shown in both calendars automatically
- 🗓️ **Full BS calendar data** — BS 1970 to 2100 (131 years)
- 📱 **Mobile responsive** — works on all screen sizes
- 🔍 **SEO optimized** — JSON-LD schemas, sitemap, meta tags
- 💰 **Google AdSense** — 4 strategic ad placements
- 🇳🇵 **Nepali script** — month names in both English and देवनागरी

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | SQLite (sql.js) |
| Styling | Vanilla CSS |
| Deployment | PM2 + Nginx |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone the repository
```bash
git clone https://github.com/prasiddha-top/ad2bs.git
cd ad2bs
```

### 2. Start the Backend
```bash
cd backend
npm install
npm start
# API running at http://localhost:5000
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# UI running at http://localhost:5173
```

### 4. Open Browser
Visit [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/convert/ad-to-bs?year=2026&month=6&day=25` | Convert AD to BS |
| `GET /api/convert/bs-to-ad?year=2083&month=3&day=11` | Convert BS to AD |
| `GET /api/convert/today` | Get today in both calendars |
| `GET /api/calendar/:year/:month` | Get BS month calendar data |
| `GET /api/health` | Health check |

### Example Response
```json
{
  "success": true,
  "data": {
    "bs": {
      "year": 2083,
      "month": 3,
      "day": 11,
      "monthNameEn": "Ashadh",
      "formatted": "2083-03-11"
    },
    "ad": {
      "year": 2026,
      "month": 6,
      "day": 25,
      "formatted": "2026-06-25"
    }
  }
}
```

---

## 🌐 Deployment

### Production Build
```bash
cd frontend
npm run build
```

### PM2 Process Manager
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

### Nginx Configuration
See `nginx.conf` for the Nginx reverse proxy configuration for `ad2bs.prasiddha.top`.

---

## 📊 Supported Date Range

| Calendar | Range |
|----------|-------|
| BS (Bikram Sambat) | 1970 BS – 2100 BS |
| AD (Gregorian) | 1913 AD – 2043 AD |

---

## 🔍 SEO

- **Sitemap:** `/sitemap.xml`
- **Robots:** `/robots.txt`
- **Structured Data:** WebApplication, FAQ, HowTo JSON-LD schemas
- **Geo:** Nepal (NP) geo targeting
- **Languages:** English + Nepali (Devanagari)

---

## 📝 License

MIT © [Prasiddha](https://prasiddha.top)
