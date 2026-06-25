const express = require('express');
const router = express.Router();
const { adToBs, bsToAd, getToday } = require('../utils/converter');
const { run, saveDB } = require('../db/database');

/**
 * GET /api/convert/ad-to-bs
 * Query: year, month, day
 */
router.get('/ad-to-bs', (req, res) => {
  try {
    const { year, month, day } = req.query;
    
    if (!year || !month || !day) {
      return res.status(400).json({ error: 'Missing required parameters: year, month, day' });
    }

    const y = parseInt(year), m = parseInt(month), d = parseInt(day);
    
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return res.status(400).json({ error: 'Invalid date parameters' });
    }

    const result = adToBs(y, m, d);
    
    // Log conversion
    try {
      run(
        `INSERT INTO conversion_log (direction, input_date, output_date, ip_address) VALUES (?, ?, ?, ?)`,
        ['AD_TO_BS', result.ad.formatted, result.bs.formatted, req.ip]
      );
      saveDB();
    } catch(e) { /* non-critical */ }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/convert/bs-to-ad
 * Query: year, month, day
 */
router.get('/bs-to-ad', (req, res) => {
  try {
    const { year, month, day } = req.query;
    
    if (!year || !month || !day) {
      return res.status(400).json({ error: 'Missing required parameters: year, month, day' });
    }

    const y = parseInt(year), m = parseInt(month), d = parseInt(day);
    
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      return res.status(400).json({ error: 'Invalid date parameters' });
    }

    const result = bsToAd(y, m, d);
    
    // Log conversion
    try {
      run(
        `INSERT INTO conversion_log (direction, input_date, output_date, ip_address) VALUES (?, ?, ?, ?)`,
        ['BS_TO_AD', result.bs.formatted, result.ad.formatted, req.ip]
      );
      saveDB();
    } catch(e) { /* non-critical */ }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/convert/today
 */
router.get('/today', (req, res) => {
  try {
    const result = getToday();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
